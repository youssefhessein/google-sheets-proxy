// استيراد المكتبات اللازمة
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

// إنشاء تطبيق Express
const app = express();

// تفعيل ميزات CORS وتحليل البيانات بصيغة JSON
app.use(cors());
app.use(bodyParser.json());

// إعداد مسار GET لمعالجة الطلبات على المسار الجذر
app.get('/', (req, res) => {
    res.send('Proxy Server is running!');
});

// إعداد مسار البروكسي
app.post('/proxy', async (req, res) => {
    try {
        // إرسال البيانات إلى Google Apps Script
        const response = await axios.post(
            'https://script.google.com/macros/s/AKfycbyyex4mSro1SpgOKSV9_r5tb763qzicIbMzPZMsFZCCyR4e5KrjRNm0gbOWHQgmT4m51Q/exec', // الرابط الصحيح
            req.body,
            { headers: { 'Content-Type': 'application/json' } }
        );
        // إرسال الرد الناتج إلى العميل
        res.json(response.data);
    } catch (error) {
        // إذا حدث خطأ، إرسال رسالة الخطأ
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// تشغيل السيرفر على المنفذ الديناميكي أو 3000 إذا لم يتم تحديده
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
