import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser, tokenManager } from "../../services/authService";
import { motion, AnimatePresence } from "framer-motion";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false); // ✅ NEW
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      
      // ✅ Only show loader if check takes > 200ms
      const loaderTimeout = setTimeout(() => {
        setShowLoader(true);
      }, 200);
      
      if (!token) {
        clearTimeout(loaderTimeout);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // ✅ Verify token is still valid
      const user = await getCurrentUser();
      
      clearTimeout(loaderTimeout); // ✅ Cancel loader if fast
      
      if (user) {
        setIsAuthenticated(true);
        tokenManager.startAutoRefresh();
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
      
      setIsLoading(false);
    };

    checkAuth();

    return () => {
      tokenManager.stopAutoRefresh();
    };
  }, []);

  // ✅ Show loader only if still loading AND delay passed
  if (isLoading && showLoader) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center"
        >
          <div className="text-center">
            {/* Animated spinner */}
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 border-r-purple-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 text-sm font-medium">
              Loading...
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // ✅ Fast path - no loader shown, instant navigation
  if (isLoading) {
    return null; // Brief blank while checking (< 200ms)
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;