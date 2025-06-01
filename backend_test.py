
import requests
import sys
import json
import csv
import io
from datetime import datetime

class DBrandTaskManagerTester:
    def __init__(self, base_url="https://74332b98-f391-4005-9ac1-0085cc51c063.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.access_token = None
        self.test_user = None
        self.test_task_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        # Add authorization token if available
        if self.access_token:
            headers['Authorization'] = f'Bearer {self.access_token}'
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, response.text if response.text else {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"Response: {response.text}")
                except:
                    pass
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test the health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "health",
            200
        )

    def test_register(self, name="Test User", email=None, password="Password123!"):
        """Test user registration"""
        if email is None:
            email = f"test_{datetime.now().strftime('%H%M%S')}@example.com"
            
        success, response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            200,  # FastAPI returns 200 for successful registration
            data={
                "name": name,
                "email": email,
                "password": password
            }
        )
        
        if success:
            self.test_user = {
                "email": email,
                "password": password
            }
            print(f"✅ Successfully registered user: {email}")
        
        return success, response
    
    def test_register_validation(self):
        """Test registration validation"""
        # Test with invalid email
        success, _ = self.run_test(
            "Registration - Invalid Email",
            "POST",
            "auth/register",
            422,  # Validation error
            data={
                "name": "Test User",
                "email": "invalid-email",
                "password": "Password123!"
            }
        )
        
        # Test with short password
        success2, _ = self.run_test(
            "Registration - Short Password",
            "POST",
            "auth/register",
            422,  # Validation error
            data={
                "name": "Test User",
                "email": "test@example.com",
                "password": "short"
            }
        )
        
        return success and success2
    
    def test_login(self, email=None, password=None):
        """Test user login"""
        if email is None and self.test_user:
            email = self.test_user["email"]
            password = self.test_user["password"]
        elif email is None:
            email = "test@example.com"
            password = "Password123!"
            
        success, response = self.run_test(
            "User Login",
            "POST",
            "auth/login",
            200,
            data={"email": email, "password": password}
        )
        
        if success and 'access_token' in response:
            self.access_token = response['access_token']
            print(f"✅ Successfully logged in and got token")
            return True, response
        return False, response
    
    def test_login_validation(self):
        """Test login validation"""
        # Test with non-existent user
        success, _ = self.run_test(
            "Login - Non-existent User",
            "POST",
            "auth/login",
            401,  # Unauthorized
            data={
                "email": f"nonexistent_{datetime.now().strftime('%H%M%S')}@example.com",
                "password": "Password123!"
            }
        )
        
        # Test with wrong password
        if self.test_user:
            success2, _ = self.run_test(
                "Login - Wrong Password",
                "POST",
                "auth/login",
                401,  # Unauthorized
                data={
                    "email": self.test_user["email"],
                    "password": "WrongPassword123!"
                }
            )
        else:
            success2 = True  # Skip if no test user
            
        return success and success2
    
    def test_get_current_user(self):
        """Test getting current user profile (requires authentication)"""
        return self.run_test(
            "Get Current User Profile",
            "GET",
            "auth/me",
            200
        )
    
    def test_unauthorized_access(self):
        """Test unauthorized access to protected endpoints"""
        # Save current token and set to None to simulate no auth
        temp_token = self.access_token
        self.access_token = None
        
        # Try to access protected endpoint
        success, _ = self.run_test(
            "Unauthorized Access - Get User Profile",
            "GET",
            "auth/me",
            403  # FastAPI returns 403 for unauthenticated requests
        )
        
        # Try to access tasks endpoint
        success2, _ = self.run_test(
            "Unauthorized Access - Get Tasks",
            "GET",
            "tasks",
            403  # FastAPI returns 403 for unauthenticated requests
        )
        
        # Restore token
        self.access_token = temp_token
        
        return success and success2
    
    def test_create_task(self, title=None, description="This is a test task", 
                         status="pending", priority="medium", category="product"):
        """Test creating a new task (requires authentication)"""
        if title is None:
            title = f"Test Task {datetime.now().strftime('%H%M%S')}"
            
        success, response = self.run_test(
            "Create Task",
            "POST",
            "tasks",
            200,  # FastAPI returns 200 for successful creation
            data={
                "title": title,
                "description": description,
                "status": status,
                "priority": priority,
                "category": category
            }
        )
        
        if success and 'id' in response:
            self.test_task_id = response['id']
            print(f"✅ Successfully created task with ID: {self.test_task_id}")
            
        return success, response
    
    def test_create_task_validation(self):
        """Test task creation validation"""
        # Test with empty title
        success, _ = self.run_test(
            "Create Task - Empty Title",
            "POST",
            "tasks",
            422,  # Validation error
            data={
                "title": "",
                "description": "This is a test task",
                "status": "pending",
                "priority": "medium",
                "category": "product"
            }
        )
        
        # Test with invalid status
        success2, _ = self.run_test(
            "Create Task - Invalid Status",
            "POST",
            "tasks",
            422,  # Validation error
            data={
                "title": "Test Task",
                "description": "This is a test task",
                "status": "invalid-status",
                "priority": "medium",
                "category": "product"
            }
        )
        
        # Test with invalid priority
        success3, _ = self.run_test(
            "Create Task - Invalid Priority",
            "POST",
            "tasks",
            422,  # Validation error
            data={
                "title": "Test Task",
                "description": "This is a test task",
                "status": "pending",
                "priority": "invalid-priority",
                "category": "product"
            }
        )
        
        # Test with invalid category
        success4, _ = self.run_test(
            "Create Task - Invalid Category",
            "POST",
            "tasks",
            422,  # Validation error
            data={
                "title": "Test Task",
                "description": "This is a test task",
                "status": "pending",
                "priority": "medium",
                "category": "invalid-category"
            }
        )
        
        return success and success2 and success3 and success4
    
    def test_get_tasks(self):
        """Test getting all tasks for the authenticated user"""
        return self.run_test(
            "Get User Tasks",
            "GET",
            "tasks",
            200
        )
    
    def test_get_task_by_id(self, task_id=None):
        """Test getting a specific task by ID"""
        if task_id is None and self.test_task_id:
            task_id = self.test_task_id
        elif task_id is None:
            print("❌ No task ID available for testing")
            return False, {}
            
        return self.run_test(
            f"Get Task by ID ({task_id})",
            "GET",
            f"tasks/{task_id}",
            200
        )
    
    def test_get_nonexistent_task(self):
        """Test getting a non-existent task"""
        return self.run_test(
            "Get Non-existent Task",
            "GET",
            f"tasks/nonexistent-task-id",
            404  # Not found
        )
    
    def test_update_task(self, task_id=None, updated_data=None):
        """Test updating a task"""
        if task_id is None and self.test_task_id:
            task_id = self.test_task_id
        elif task_id is None:
            print("❌ No task ID available for testing")
            return False, {}
            
        if updated_data is None:
            updated_data = {
                "title": f"Updated Task {datetime.now().strftime('%H%M%S')}",
                "status": "in-progress",
                "priority": "high",
                "category": "marketing"
            }
            
        return self.run_test(
            f"Update Task ({task_id})",
            "PUT",
            f"tasks/{task_id}",
            200,
            data=updated_data
        )
    
    def test_update_nonexistent_task(self):
        """Test updating a non-existent task"""
        return self.run_test(
            "Update Non-existent Task",
            "PUT",
            f"tasks/nonexistent-task-id",
            404,  # Not found
            data={"title": "Updated Task"}
        )
    
    def test_delete_task(self, task_id=None):
        """Test deleting a task"""
        if task_id is None and self.test_task_id:
            task_id = self.test_task_id
        elif task_id is None:
            print("❌ No task ID available for testing")
            return False, {}
            
        success, response = self.run_test(
            f"Delete Task ({task_id})",
            "DELETE",
            f"tasks/{task_id}",
            200  # Success
        )
        
        if success:
            # Clear the test task ID since it's been deleted
            self.test_task_id = None
            
        return success, response
    
    def test_delete_nonexistent_task(self):
        """Test deleting a non-existent task"""
        return self.run_test(
            "Delete Non-existent Task",
            "DELETE",
            f"tasks/nonexistent-task-id",
            404  # Not found
        )
    
    def test_export_tasks_json(self):
        """Test exporting tasks as JSON"""
        return self.run_test(
            "Export Tasks as JSON",
            "GET",
            "tasks/export/json",
            200
        )
    
    def test_export_tasks_csv(self):
        """Test exporting tasks as CSV"""
        success, response = self.run_test(
            "Export Tasks as CSV",
            "GET",
            "tasks/export/csv",
            200
        )
        
        if success and isinstance(response, dict) and 'csv' in response:
            # Validate CSV format
            try:
                csv_content = response['csv']
                csv_reader = csv.reader(io.StringIO(csv_content))
                headers = next(csv_reader)
                expected_headers = ["id", "title", "description", "status", "priority", "category", "created_at", "updated_at"]
                
                if all(header in headers for header in expected_headers):
                    print("✅ CSV format is valid")
                else:
                    print("❌ CSV headers don't match expected format")
                    success = False
            except Exception as e:
                print(f"❌ Failed to parse CSV: {str(e)}")
                success = False
                
        return success, response
    
    def test_export_invalid_format(self):
        """Test exporting tasks with invalid format"""
        return self.run_test(
            "Export Tasks - Invalid Format",
            "GET",
            "tasks/export/invalid",
            400  # Bad request
        )

def main():
    # Setup
    tester = DBrandTaskManagerTester()
    
    # Health check
    print("\n===== Testing Health Check =====")
    tester.test_health_check()
    
    # Authentication tests
    print("\n===== Testing Authentication =====")
    
    # Register a new user
    test_email = f"test_{datetime.now().strftime('%H%M%S')}@example.com"
    success, user_data = tester.test_register(email=test_email)
    
    # Test registration validation
    tester.test_register_validation()
    
    # Login with the new user
    if success:
        login_success, _ = tester.test_login(email=test_email, password="Password123!")
    else:
        # Try with a default user that might exist
        login_success, _ = tester.test_login()
    
    # Test login validation
    tester.test_login_validation()
    
    # Test unauthorized access
    tester.test_unauthorized_access()
    
    # If login successful, continue with other tests
    if login_success:
        # Get current user profile
        tester.test_get_current_user()
        
        # Task management tests
        print("\n===== Testing Task Management =====")
        
        # Test task creation validation
        tester.test_create_task_validation()
        
        # Create tasks with different categories and priorities
        tester.test_create_task(
            title="Product Task",
            description="This is a product task",
            category="product",
            priority="high"
        )
        
        tester.test_create_task(
            title="Marketing Task",
            description="This is a marketing task",
            category="marketing",
            priority="medium"
        )
        
        tester.test_create_task(
            title="Support Task",
            description="This is a support task",
            category="support",
            priority="low"
        )
        
        # Get all tasks
        success, tasks = tester.test_get_tasks()
        
        # Test export functionality
        print("\n===== Testing Export Functionality =====")
        tester.test_export_tasks_json()
        tester.test_export_tasks_csv()
        tester.test_export_invalid_format()
        
        # If we have tasks, test operations on a specific task
        if success and tasks and len(tasks) > 0:
            task_id = tasks[0].get('id')
            if task_id:
                # Get specific task
                tester.test_get_task_by_id(task_id)
                
                # Update the task
                tester.test_update_task(
                    task_id,
                    {"status": "in-progress", "priority": "high"}
                )
                
                # Delete the task
                tester.test_delete_task(task_id)
        
        # Test operations on non-existent tasks
        tester.test_get_nonexistent_task()
        tester.test_update_nonexistent_task()
        tester.test_delete_nonexistent_task()
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run} ({tester.tests_passed/tester.tests_run*100:.1f}%)")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
