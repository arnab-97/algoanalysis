import NavLinks from "./sub-component/NavLinks";
import NavHeader from "./sub-component/NavHeader";
import NavButtons from "./sub-component/NavButtons";

export default function SideNav() {
  return (
    <div
      id="side-nav"
      className="absolute w-[90%] left-[-100%] top-[70px] md:sticky md:left-0 md:top-0 z-10 bg-bg-1 max-h-screen h-full auto-col-min md:w-full border-r-2 border-border-1 overflow-hidden ease-in duration-300"
    >
      <NavHeader />
      <div className="flex flex-col h-[calc(100vh-70px)] pb-[140px] overflow-y-auto">
        <NavLinks />
      </div>
      <NavButtons />
    </div>
  );
}