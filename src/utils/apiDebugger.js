// DevTunnel API Test Helper
// Use this in browser console to test API connectivity

const testAPI = async () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8085';
  
  console.log('🔍 Testing DevTunnel Connection...');
  console.log(`📍 Backend URL: ${API_BASE_URL}`);
  
  try {
    // Test 1: Basic connectivity
    console.log('\n1️⃣ Testing basic connectivity...');
    const testResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'test', password: 'test' }),
    });
    
    console.log(`✅ Server responded with status: ${testResponse.status}`);
    console.log(`📋 Response headers:`, {
      'Access-Control-Allow-Origin': testResponse.headers.get('Access-Control-Allow-Origin'),
      'Content-Type': testResponse.headers.get('Content-Type'),
    });
    
    // Test 2: CORS headers
    console.log('\n2️⃣ Checking CORS headers...');
    const corsTest = await fetch(`${API_BASE_URL}/api/patients`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log(`✅ CORS check - Status: ${corsTest.status}`);
    console.log(`✅ CORS headers present:`, {
      'Access-Control-Allow-Origin': corsTest.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': corsTest.headers.get('Access-Control-Allow-Methods'),
    });
    
    console.log('\n✅ DevTunnel connection test completed!');
    
  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.error('💡 Possible causes:');
    console.error('  1. Backend server is not running');
    console.error('  2. DevTunnel URL is incorrect');
    console.error('  3. CORS is not properly configured on backend');
    console.error('  4. Network connectivity issue');
  }
};

// Export for use in browser
window.testAPI = testAPI;

// Auto-log the API URL on page load
console.log('🚀 Frontend API URL:', process.env.REACT_APP_API_URL || 'http://localhost:8085');
console.log('💡 Run testAPI() in console to test backend connectivity');
