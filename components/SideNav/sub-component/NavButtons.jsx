import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function NavButtons() {
  const router = useRouter();
  const isSDESheet = router.pathname === "/sde-sheet";
  const isRoadmap = router.pathname === "/roadmap";

  const handleNavigation = (e, path) => {
    if ((path === "/sde-sheet" && isSDESheet) || (path === "/roadmap" && isRoadmap)) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div
      id="nav-button-container"
      className="absolute w-full bottom-0 flex flex-col gap-4 p-4 bg-bg-1 border-t border-border-1"
    >
      <Link 
        href="/sde-sheet"
        onClick={(e) => handleNavigation(e, "/sde-sheet")}
        className={`w-full flex justify-center items-center uppercase font-space gap-2 py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan ${
          isSDESheet 
            ? "bg-gradient-to-r from-green-bg to-cyan-bg text-green border-2 border-green" 
            : "bg-bg-2 text-text-1 border-2 border-border-1 hover:bg-bg-3 hover:border-cyan hover:text-cyan"
        }`}
      >
        <span className="flex items-center gap-2">
          {isSDESheet && (
            <div className="w-2 h-2 rounded-full bg-green animate-pulse"/>
          )}
          SDE Sheet
        </span>
      </Link>

      <Link 
        href="/roadmap"
        onClick={(e) => handleNavigation(e, "/roadmap")}
        className={`w-full flex justify-center items-center uppercase font-space gap-2 py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan ${
          isRoadmap 
            ? "bg-gradient-to-r from-purple-bg to-cyan-bg text-purple border-2 border-purple" 
            : "bg-bg-2 text-text-1 border-2 border-border-1 hover:bg-bg-3 hover:border-purple hover:text-purple"
        }`}
      >
        <span className="flex items-center gap-2">
          {isRoadmap && (
            <div className="w-2 h-2 rounded-full bg-purple animate-pulse"/>
          )}
          SDE Roadmap
        </span>
      </Link>

      <Link 
        href="https://github.com/arnab-4"
        target="_blank"
        className="w-full flex justify-center items-center uppercase font-space gap-2 text-green bg-bg-2 border-2 border-border-1 py-3 px-4 rounded-lg transition-all duration-300 hover:bg-bg-3 hover:border-green"
      >
        <Image
          src="/assets/github.svg"
          alt="github svg icon"
          width="20"
          height="20"
        />
        GITHUB
      </Link>
    </div>
  );
}