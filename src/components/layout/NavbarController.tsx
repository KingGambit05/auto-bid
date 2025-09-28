// // components/layout/Navbar.tsx - Smart Navbar Controller
// "use client";

// import React from "react";
// import { useAuth } from "@/hooks/useAuth";
// import GuestNavbar from "./GuestNavbar";
// import UserNavbar from "./UserNavbar";
// import { Gavel } from "lucide-react";

// const NavbarController = () => {
//   const { isAuthenticated, isLoading } = useAuth();

//   // Show loading state while checking authentication
//   if (isLoading) {
//     return (
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
//         <div className="container-responsive">
//           <div className="flex justify-between items-center h-16 lg:h-20">
//             {/* Logo with loading state */}
//             <div className="flex items-center space-x-2">
//               <Gavel className="h-7 w-7 sm:h-8 sm:w-8 text-black" />
//               <span className="text-lg sm:text-xl font-bold text-black">
//                 AutoBid
//               </span>
//             </div>
            
//             {/* Loading indicator */}
//             <div className="flex items-center space-x-3">
//               <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
//               <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   // Render appropriate navbar based on authentication status
//   return isAuthenticated ? <UserNavbar /> : <GuestNavbar />;
// };

// export default NavbarController;