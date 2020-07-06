
module.exports = () => {
        let data = new Date()
        var created_at = data.getFullYear().toString();
        created_at += (data.getMonth() + 1).toString().padStart(2, '0');
        created_at += data.getDate().toString().padStart(2, '0');
        created_at += data.getHours().toString().padStart(2, '0');
        created_at += data.getMinutes().toString().padStart(2, '0');
        created_at += data.getSeconds().toString().padStart(2, '0');
        return created_at
    }