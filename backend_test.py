
import requests
import sys
import time
from datetime import datetime

class CaseCraftAPITester:
    def __init__(self, base_url):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.user_id = None
        self.test_task_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
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
                    return success, response.json() if response.text else {}
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"Response: {response.json()}")
                except:
                    print(f"Response: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test the health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )

    def test_register(self, name, email, password):
        """Test user registration"""
        success, response = self.run_test(
            "User Registration",
            "POST",
            "api/auth/register",
            200,
            data={"name": name, "email": email, "password": password}
        )
        if success and 'id' in response:
            self.user_id = response['id']
        return success, response

    def test_login(self, email, password):
        """Test login and get token"""
        success, response = self.run_test(
            "Login",
            "POST",
            "api/auth/login",
            200,
            data={"email": email, "password": password}
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            return True, response
        return False, response

    def test_get_profile(self):
        """Test getting user profile"""
        return self.run_test(
            "Get User Profile",
            "GET",
            "api/auth/me",
            200
        )

    def test_create_task(self, title, description, status="pending", priority="medium", category="general"):
        """Create a task"""
        success, response = self.run_test(
            "Create Task",
            "POST",
            "api/tasks",
            200,
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
        return success, response

    def test_get_tasks(self):
        """Get all tasks"""
        return self.run_test(
            "Get All Tasks",
            "GET",
            "api/tasks",
            200
        )

    def test_get_task(self, task_id):
        """Get a task by ID"""
        return self.run_test(
            "Get Task by ID",
            "GET",
            f"api/tasks/{task_id}",
            200
        )

    def test_update_task(self, task_id, update_data):
        """Update a task"""
        return self.run_test(
            "Update Task",
            "PUT",
            f"api/tasks/{task_id}",
            200,
            data=update_data
        )

    def test_delete_task(self, task_id):
        """Delete a task"""
        return self.run_test(
            "Delete Task",
            "DELETE",
            f"api/tasks/{task_id}",
            200
        )

    def test_export_tasks(self, format_type):
        """Test task export"""
        return self.run_test(
            f"Export Tasks ({format_type})",
            "GET",
            f"api/tasks/export/{format_type}",
            200
        )

def main():
    # Get the backend URL from the environment
    backend_url = "https://8ceea0d3-b55f-4518-abd1-00fc10348a66.preview.emergentagent.com"
    
    # Setup
    tester = CaseCraftAPITester(backend_url)
    timestamp = datetime.now().strftime('%H%M%S')
    test_user = {
        "name": f"Test User {timestamp}",
        "email": f"test{timestamp}@example.com",
        "password": "TestPass123!"
    }
    
    print(f"🚀 Starting CaseCraft Premium API Tests")
    print(f"🔗 API URL: {backend_url}")
    print(f"⏱️  Timestamp: {timestamp}")
    print("-" * 50)

    # Run tests
    health_success, _ = tester.test_health_check()
    if not health_success:
        print("❌ Health check failed, stopping tests")
        return 1

    # Test user registration
    register_success, register_response = tester.test_register(
        test_user["name"], 
        test_user["email"], 
        test_user["password"]
    )
    
    # Test login
    login_success, login_response = tester.test_login(
        test_user["email"], 
        test_user["password"]
    )
    if not login_success:
        print("❌ Login failed, stopping authenticated tests")
        return 1

    # Test profile
    profile_success, profile_response = tester.test_get_profile()
    
    # Test task creation
    task_success, task_response = tester.test_create_task(
        f"Test Task {timestamp}",
        f"This is a test task created at {timestamp}",
        "pending",
        "high",
        "product"
    )
    
    if task_success and tester.test_task_id:
        # Test get all tasks
        get_tasks_success, _ = tester.test_get_tasks()
        
        # Test get single task
        get_task_success, _ = tester.test_get_task(tester.test_task_id)
        
        # Test update task
        update_success, _ = tester.test_update_task(
            tester.test_task_id,
            {
                "status": "in-progress",
                "priority": "medium",
                "description": f"Updated description at {timestamp}"
            }
        )
        
        # Test export tasks
        export_json_success, _ = tester.test_export_tasks("json")
        export_csv_success, _ = tester.test_export_tasks("csv")
        
        # Test delete task
        delete_success, _ = tester.test_delete_task(tester.test_task_id)
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"📋 Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    print("=" * 50)
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
