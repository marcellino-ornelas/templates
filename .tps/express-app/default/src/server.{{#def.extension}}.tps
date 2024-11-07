import 'dotenv/config'; // Load environment variables
import app from './app.js';

const PORT = process.env.PORT || {{= tps.answers.port }};

// === Start the server ===
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
