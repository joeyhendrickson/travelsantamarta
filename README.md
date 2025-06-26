# 🌴 Travel Santa Marta AI Assistant

A complete AI-powered travel assistant for planning trips to Santa Marta, Colombia. Built with FastAPI, OpenAI GPT-4, and a modern responsive web interface.

## ✨ Features

- **AI Chat Assistant**: Powered by OpenAI GPT-4 for personalized travel recommendations
- **Mobile Responsive**: Beautiful design that works on all devices
- **Real-time Chat**: Interactive chat interface with typing indicators
- **Supabase Integration**: Conversation storage and lead management
- **Fallback Responses**: Works even when OpenAI API is unavailable
- **Modern UI**: Gradient backgrounds, smooth animations, and intuitive design

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/joeyhendrickson/travelsantamarta.git
   cd travel-santa-marta-agent
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set environment variables**
   ```bash
   export OPENAI_API_KEY="your-openai-api-key-here"
   ```

4. **Run the server**
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

5. **Open your browser**
   Navigate to `http://localhost:8000`

## 🌐 Deployment

### Railway (Recommended)

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Deploy**
   ```bash
   railway up
   ```

4. **Set environment variables in Railway dashboard**
   - `OPENAI_API_KEY`: Your OpenAI API key

### Heroku

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set OPENAI_API_KEY="your-openai-api-key-here"
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

## 🔧 Configuration

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required for AI responses)
- `SUPABASE_URL`: Supabase project URL (optional, for conversation storage)
- `SUPABASE_KEY`: Supabase API key (optional, for conversation storage)

### API Endpoints

- `GET /`: Main website
- `POST /chat`: Chat API endpoint
- `GET /health`: Health check endpoint
- `GET /api/chat`: Alternative chat endpoint (redirects to /chat)

## 📱 Mobile Features

- **Hamburger Menu**: Mobile-friendly navigation
- **Responsive Design**: Optimized for all screen sizes
- **Touch-Friendly**: Large buttons and touch targets
- **Auto-resize Textarea**: Dynamic input field sizing
- **Smooth Animations**: 60fps animations and transitions

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful purple-blue gradients
- **Glass Morphism**: Modern frosted glass effects
- **Smooth Animations**: Hover effects and transitions
- **Typography**: Clean, readable fonts
- **Color Scheme**: Professional blue and purple theme

## 🤖 AI Assistant Features

- **Contextual Responses**: Understands travel-related queries
- **Fallback System**: Works without OpenAI API
- **Conversation Memory**: Maintains context throughout chat
- **Personalized Recommendations**: Tailored to user preferences
- **Multi-language Support**: Responds in English and Spanish

## 📊 Database Schema

### Conversations Table (Supabase)
```sql
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    lead_id TEXT,
    message TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔒 Security

- **CORS Enabled**: Cross-origin requests allowed
- **Input Validation**: Sanitized user inputs
- **Error Handling**: Graceful error responses
- **Rate Limiting**: Built-in protection against abuse

## 🛠️ Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **AI**: OpenAI GPT-4
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Railway/Heroku/Vercel ready

## 📈 Performance

- **Fast Loading**: Optimized assets and minimal dependencies
- **Responsive**: Works on all devices and screen sizes
- **Scalable**: Built for high-traffic deployment
- **SEO Friendly**: Meta tags and structured data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@travelsantamarta.com or create an issue on GitHub.

## 🌟 Credits

- **Design**: Modern, responsive UI/UX
- **AI**: Powered by OpenAI GPT-4
- **Hosting**: Railway/Heroku/Vercel compatible
- **Icons**: Custom SVG icons and emojis

---

**Made with ❤️ for travelers exploring Santa Marta, Colombia** 