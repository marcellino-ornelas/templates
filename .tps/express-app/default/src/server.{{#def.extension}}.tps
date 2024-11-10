import 'dotenv/config'; // Load environment variables
import app from './app.js';
{{{? tps.answers.database === 'mongoose'}}}
import { connectDB } from './models/index.js';
{{{?}}}

const PORT = process.env.PORT || {{= tps.answers.port }};

// === Start the server ===
{{{? tps.answers.database === 'mongoose'}}}
(async () => {
	await connectDB();

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
})();
{{{??}}}
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
{{{?}}}
