import unittest
from server import app 

class DashboardTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    
    # Test getting a dashboard successfully
    def test_get_dashboard_success(self):
        response = self.app.get('/dashboard/Game Analytics')
        self.assertEqual(response.status_code, 200)
        self.assertIn('charts', response.json)

    # Test getting a non-existent dashboard
    def test_get_dashboard_not_found(self):
        response = self.app.get('/dashboard/non-existent')
        self.assertEqual(response.status_code, 404)
        self.assertIn('error', response.json)

    # Test getting a chart successfully
    def test_get_chart_success(self):
        response = self.app.get('/chart/2')
        self.assertEqual(response.status_code, 200)
        self.assertIn('analytics', response.json)
        
    # Test getting a non-existent chart
    def test_get_chart_not_found(self):
        response = self.app.get('/chart/3')
        self.assertEqual(response.status_code, 404)
        self.assertIn('error', response.json)

if __name__ == '__main__':
    unittest.main()
