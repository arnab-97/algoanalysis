import { motion } from 'framer-motion';

export default function WelcomeScreen({ onQuestionClick, suggestedQuestions }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <motion.div
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green to-cyan flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 30px rgba(30, 254, 91, 0.3)",
              "0 0 50px rgba(30, 254, 91, 0.5)",
              "0 0 30px rgba(30, 254, 91, 0.3)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-12 h-12 text-bg-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M8 12h8M12 8v8"/>
          </svg>
        </motion.div>
        
        <h2 className="text-3xl font-unica text-text-1 mb-4">
          Welcome to Algorithm AI
        </h2>
        
        <p className="text-text-1 font-space text-lg max-w-2xl mx-auto leading-relaxed">
          I'm your personal algorithm assistant powered by Gemini 2.0 Flash. 
          I can help you understand algorithms, analyze complexity, debug code, 
          and provide step-by-step explanations.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-4xl"
      >
        <h3 className="text-xl font-space text-green mb-6">
          Try asking me about:
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedQuestions.map((question, index) => (
            <motion.button
              key={index}
              onClick={() => onQuestionClick(question)}
              className="p-4 bg-bg-2 border-2 border-border-1 rounded-lg text-left text-text-1 font-space hover:border-green hover:bg-green-bg transition-all duration-200"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green to-cyan flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-bg-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm">{question}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 text-sm text-text-1 opacity-60 font-space"
      >
        💡 I can explain algorithms, analyze complexity, help with debugging, and much more!
      </motion.div>
    </div>
  );
}