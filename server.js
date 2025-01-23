const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

// إعداد CORS وتحليل JSON
app.use(cors());
app.use(bodyParser.json());

// مسار التحقق
app.get("/", (req, res) => {
    res.send("Proxy Server is running!");
});

// مسار البروكسي لاستقبال الحقول بشكل ديناميكي
app.post("/proxy", async (req, res) => {
    try {
        console.log("Received Data:", req.body); // تسجيل جميع الحقول المستلمة

        const response = await axios.post(
            "https://script.google.com/macros/s/AKfycbyyex4mSro1SpgOKSV9_r5tb763qzicIbMzPZMsFZCCyR4e5KrjRNm0gbOWHQgmT4m51Q/exec", // استبدل بـ رابط Google Apps Script
            req.body,
            { headers: { "Content-Type": "application/json" } }
        );

        res.json(response.data); // إرسال الرد للعميل
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ status: "error", message: error.message });
    }
});

// تشغيل الخادم
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
