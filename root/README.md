# 🌴 Travel Santa Marta - AI Travel Assistant

An intelligent chatbot designed to help users plan the perfect 1-week trip to Santa Marta, Colombia. Built with FastAPI, React, and OpenAI GPT-4.

## 🚀 Features

- **AI-Powered Travel Planning**: Personalized trip recommendations using GPT-4
- **Local Expertise**: Curated suggestions for Santa Marta attractions and experiences
- **Lead Generation**: Collects contact information for custom itineraries
- **Conversation Storage**: All interactions saved to Supabase for follow-up
- **Modern UI**: Beautiful, responsive chat interface
- **Real-time Chat**: Instant responses with typing indicators

## 🏗️ Architecture

### Backend (FastAPI)
- **`main.py`**: FastAPI server with chat endpoint
- **`prompt_template.py`**: AI system prompt for travel assistance
- **`supabase_client.py`**: Database integration for conversation storage

### Frontend (React)
- **`App.jsx`**: Main application container
- **`ChatBox.jsx`**: Chat interface component
- **`styles.css`**: Modern, responsive styling

## 🛠️ Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- Supabase account
- OpenAI API key

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Environment Variables
Create a `.env` file in the backend directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

## 📊 Database Schema

The application uses Supabase to store conversations:

```sql
-- conversations table
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  lead_id TEXT,
  message TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎯 What This Agent Does

The Travel Santa Marta Agent is designed to:

1. **Collect Travel Preferences**:
   - Travel dates
   - Interests (beaches, adventure, nature, romance, nightlife)
   - Budget range
   - Group size

2. **Recommend Local Attractions**:
   - Tayrona National Park
   - Minca waterfalls
   - Gaira neighborhoods
   - Local restaurants and beaches

3. **Generate Leads**:
   - Collect name and email
   - Prepare custom itineraries
   - Follow up with travel updates

4. **Store Conversations**:
   - Save all interactions to Supabase
   - Enable personalized follow-up
   - Track user preferences

## 🌐 Deployment

### Backend (Vercel)
The backend is configured for Vercel deployment with the provided `vercel.json`.

### Frontend (Vercel)
The React frontend can be deployed to Vercel or any static hosting service.

## 🔗 Links

- **GitHub Repository**: [https://github.com/joeyhendrickson/travelsantamarta.git](https://github.com/joeyhendrickson/travelsantamarta.git)
- **Supabase Project**: [https://mhsmbwxdqymfihcoludw.supabase.co](https://mhsmbwxdqymfihcoludw.supabase.co)

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Chat Interface**: Clean, intuitive messaging experience
- **Travel Theme**: Beautiful gradients and travel-inspired design
- **Real-time Updates**: Live typing indicators and message timestamps
- **Error Handling**: Graceful fallbacks for API issues

## 🚀 Getting Started

1. Clone the repository
2. Set up your environment variables
3. Install dependencies for both backend and frontend
4. Start the development servers
5. Begin planning your Santa Marta adventure! 🌴

---

*Built with ❤️ for travelers exploring the beautiful Santa Marta, Colombia*
