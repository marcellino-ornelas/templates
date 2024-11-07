import 'dotenv/config'; // Load environment variables
import app from './app.js

// === Start the server ===
const PORT = process.env.PORT || {{= tps.answers.port }};
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});