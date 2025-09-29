# 🛡️ JWT vs Session Cookies – Notes

## 🔑 Authentication Models

- **Stateful Auth → Session Cookie**
- **Stateless Auth → JWT (JSON Web Token)**

---

## 🍪 Session Cookie Authentication (Step by Step)

1. **User Sends Login Request**
   - User username + password bhejta hai server ko.

2. **Server Authorises Login**
   - Agar credentials sahi hain, server ek **session banata hai database me** (Redis / SQL etc).
   - Ek **unique session ID** generate hoti hai.

3. **Server Sends Cookie**
   - Server ek **cookie send karta hai client ko**, jisme **session ID** hota hai.

4. **Client Subsequent Requests**
   - Jab user next request karega, browser apne aap **cookie attach karke bhejega**.

5. **Server Validation**
   - Server cookie ke andar ka **session ID** uthata hai.
   - Database me check karta hai ki valid session hai ya nahi.
   - Agar valid hai → requested page/data return kar deta hai.

---

## 🍪 Cookie in Detail

### 🔨 Creation
- Server `Set-Cookie` header ke through client ko cookie bhejta hai.
- Example:  
  ```
  Set-Cookie: sessionId=abc123; HttpOnly; Secure
  ```

### 📦 Storage
- Browser ke **cookie storage** me save hoti hai.
- Session ya persistent dono ho sakti hai.

### 🚚 Sending with Requests
- Har request ke saath, browser **automatically cookies attach** karta hai (agar domain match karta ho).

### ⚙️ Server Processing
- Server incoming request me cookie uthata hai.
- Uske session ID ko database me verify karta hai.

### 🎯 Usage
- Mostly **auth** (login session maintain karne ke liye).
- Lekin small data (preferences, tracking info) bhi store karte hain.

---

## 🍪 Cookie Types

1. **Session Cookies**
   - Browser band hote hi delete ho jati hain.
   - Sirf ek **session** tak survive karti hain.

2. **Persistent Cookies**
   - Ek **expiry date/time** set hoti hai.
   - Browser band hone ke baad bhi rehti hain, jab tak expire na ho.

---

## 🔒 Privacy & Concerns
- **Incognito Mode** → session cookies banengi, but browser band hote hi sab clear ho jayega.
- Tracking issues: Persistent cookies ka misuse advertisers karte hain.

---

## 🗃️ Storage Options Comparison

| Storage Type     | Auto-send with Req? | Lifetime | Use Case |
|------------------|---------------------|----------|----------|
| **Cookies**      | ✅ Yes              | Session or Persistent | Auth (session mgmt), small data |
| **Local Storage**| ❌ No               | Until manually cleared | User preferences, caching |
| **Session Storage** | ❌ No            | Tab/browser close hone tak | Temporary data, form inputs |

---

## 🔑 Key Points for Students

- **Cookie Storage**  
  - Auth ke liye best, kyunki har request ke sath server ko jati hai.  
  - Session + Persistent dono support karti hai.

- **Local Storage**  
  - Data manually use karna padta hai (apne aap request me nahi jata).  
  - Long-term data store karne ke liye useful.

- **Session Storage**  
  - Sirf ek tab/session tak kaam karta hai.  
  - Temporary data store karne ke liye use hota hai.

---

✅ **Summary**:  
- **Session Cookie** = server me session store hota hai (stateful).  
- **JWT** = client ke pass token hota hai (stateless). 