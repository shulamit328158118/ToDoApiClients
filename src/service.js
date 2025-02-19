import axios from 'axios';

// יצירת מופע Axios עם הגדרות ברירת מחדל
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
        headers: {
        'Content-Type': 'application/json',
    }
});

// הגדרת interceptor לתפיסת שגיאות בתגובות
api.interceptors.response.use(
    (response) => {
        // אם התגובה תקינה, פשוט מחזירים אותה
        return response;
    },
    (error) => {
        // אם יש שגיאה בתגובה
        console.error("Axios Response Error Interceptor:", error); // רישום השגיאה לקונסול
        // כאן אפשר להוסיף לוגיקה נוספת לטיפול בשגיאות גלובליות
        // לדוגמה, הצגת הודעה למשתמש, ניסיון חוזר לבקשה וכו'
        return Promise.reject(error); // חשוב לזרוק את השגיאה כדי שהפונקציה הקוראת תוכל לטפל בה
    }
);

export default {
    getTasks: async () => {
        try {
            const result = await api.get('/items');
            return result.data;
        } catch (error) {
            console.error("Error getting tasks:", error); // רישום שגיאה ספציפית לפונקציה
            throw error; // זריקת השגיאה למעלה
        }
    },

    addTask: async (name) => {
        try {
            const result = await api.post('/items', { name });
            return result.data;
        } catch (error) {
            console.error("Error adding task:", error);
            throw error;
        }
    },

    setCompleted: async (id, isComplete) => {
        try {
            const result = await api.put(`/items/${id}`, { isComplete });
            return result.data;
        } catch (error) {
            console.error("Error setting task completion:", error);
            throw error;
        }
    },

    deleteTask: async (id) => {
        try {
            const result = await api.delete(`/items/${id}`);
            return result.status;
        } catch (error) {
            console.error("Error deleting task:", error);
            throw error;
        }
    }
}
;


