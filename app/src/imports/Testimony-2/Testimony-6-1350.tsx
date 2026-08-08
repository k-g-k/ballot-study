import { ChevronDown } from "lucide-react";
import svgPaths from "./svg-g4dbsxhzbx";
import imgImage1 from "./e781dad3acb1dbd148087b765d4ba2ea835205ed.png";
import imgRectangle210 from "./70017910a949817aa1c11716388ee64b40b2eafa.png";
import imgRectangle211 from "./70017910a949817aa1c11716388ee64b40b2eafa.png";
import imgRectangle209 from "./70017910a949817aa1c11716388ee64b40b2eafa.png";

function NavLInk4() {
  return (
    <div className="content-stretch flex items-start py-[12px] relative shrink-0" data-name="navLInk 5">
      <p className="font-['Nunito:ExtraBold',sans-serif] font-extrabold leading-[1.5] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Ballot Questions</p>
    </div>
  );
}

function NavLInk1() {
  return (
    <div className="content-stretch flex items-start py-[12px] relative shrink-0" data-name="navLInk 2">
      <p className="font-['Nunito:ExtraBold',sans-serif] font-extrabold leading-[1.5] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">{` Bills`}</p>
    </div>
  );
}

function NavLInk5() {
  return (
    <div className="content-stretch flex items-start py-[12px] relative shrink-0" data-name="navLInk 6">
      <p className="font-['Nunito:ExtraBold',sans-serif] font-extrabold leading-[1.5] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Hearings</p>
    </div>
  );
}

function NavLInk() {
  return (
    <div className="content-stretch flex items-start py-[12px] relative shrink-0" data-name="navLInk 1">
      <p className="font-['Nunito:ExtraBold',sans-serif] font-extrabold leading-[1.5] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">{` Testimony`}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="h-[16px] relative shrink-0 w-[24px]" data-name="Arrow">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 16">
        <g id="Arrow" opacity="0.8">
          <path d={svgPaths.p2cc6bdf0} fill="var(--fill-0, white)" fillOpacity="0.8" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function NavLInk2() {
  return (
    <div className="content-stretch flex items-center py-[12px] relative shrink-0" data-name="navLInk 3">
      <p className="font-['Nunito:ExtraBold',sans-serif] font-extrabold leading-[1.5] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">About MAPLE</p>
      <Arrow />
    </div>
  );
}

function Arrow1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[24px]" data-name="Arrow">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 16">
        <g id="Arrow" opacity="0.8">
          <path d={svgPaths.p2cc6bdf0} fill="var(--fill-0, white)" fillOpacity="0.8" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function NavLInk3() {
  return (
    <div className="content-stretch flex items-center py-[12px] relative shrink-0" data-name="navLInk 4">
      <p className="font-['Nunito:ExtraBold',sans-serif] font-extrabold leading-[1.5] relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] whitespace-nowrap">Learn</p>
      <Arrow1 />
    </div>
  );
}

function Account() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="account">
      <div className="bg-[#c61e32] content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="font-['Nunito:Bold',sans-serif] font-bold leading-[1.5] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Log In/Sign Up</p>
      </div>
    </div>
  );
}

function NavLinks() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-end px-[12px] relative shrink-0" data-name=".navLinks">
      <NavLInk4 />
      <NavLInk1 />
      <NavLInk5 />
      <NavLInk />
      <NavLInk2 />
      <NavLInk3 />
      <Account />
    </div>
  );
}

function Navbar() {
  return (
    <div className="bg-[#1a3185] content-stretch flex items-center justify-between overflow-clip px-[16px] py-[12px] shrink-0 sticky top-0 w-[1440px] z-[2]" data-name="navbar">
      <div className="overflow-clip relative shrink-0 size-[80px]" data-name="Logo">
        <div className="absolute inset-[3.89%_6.45%_23.39%_6.45%]" data-name="image 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
        </div>
        <div className="absolute inset-[79.11%_9.65%_3.89%_9.65%]" data-name="MAPLE">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64.5616 13.601">
            <g id="MAPLE">
              <path d={svgPaths.p3b481780} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2b5ce890} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2dda1e80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p716f000} fill="var(--fill-0, white)" />
              <path d={svgPaths.p6739780} fill="var(--fill-0, white)" />
            </g>
          </svg>
        </div>
      </div>
      <NavLinks />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center leading-[normal] relative shrink-0 text-black">
      <p className="font-['Nunito:SemiBold',sans-serif] font-semibold relative shrink-0 text-[40px] tracking-[0.4px] w-[588px]">Ballot Questions</p>
      <p className="font-['Nunito:SemiBold',sans-serif] font-semibold relative shrink-0 text-[40px] text-right tracking-[0.4px] w-[604px]">2024</p>
      <ChevronDown size={24} className="relative shrink-0 text-black" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <Frame3 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-[24px]">
      <p className="col-1 font-['Lexend:SemiBold',sans-serif] font-semibold leading-[normal] ml-0 mt-0 relative row-1 text-black tracking-[0.24px] w-[993px]">State Auditor’s Authority to Audit the Legislature</p>
      <p className="col-1 font-['Nunito:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-[34px] relative row-1 text-[#808080] tracking-[-0.625px] w-[993px]">Authorize the state auditor to audit the state legislature, and remove some existing regulations regarding the auditing process</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <Group />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame32 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      <p className="font-['Lexend:Thin',sans-serif] font-thin leading-[normal] relative shrink-0 text-[56px] text-black text-center tracking-[0.56px] w-[135px]">1</p>
      <Frame4 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-between relative shrink-0 w-[1196px]">
      <Frame10 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex h-[100px] items-center relative shrink-0 w-full">
      <div className="flex flex-row items-center self-stretch">
        <Frame25 />
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame15 />
    </div>
  );
}

function PolicyHeader() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Policy Header">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[24px] relative size-full">
          <Frame16 />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-[24px]">
      <p className="col-1 font-['Lexend:SemiBold',sans-serif] font-semibold leading-[1.3] ml-0 mt-0 relative row-1 text-black tracking-[0.24px] w-[993px]">Elimination of MCAS as High School Graduation Requirement</p>
      <p className="col-1 font-['Nunito:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-[35px] relative row-1 text-[#808080] tracking-[-0.625px] w-[993px]">Eliminate the requirement that students must pass the standards-based (MCAS) exam to graduate high school</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0">
      <Group1 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      <p className="font-['Lexend:Thin',sans-serif] font-thin leading-[normal] relative shrink-0 text-[56px] text-black text-center tracking-[0.56px] w-[135px]">2</p>
      <Frame5 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-between relative shrink-0 w-[1196px]">
      <Frame11 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex h-[101px] items-center relative shrink-0 w-full">
      <div className="flex flex-row items-center self-stretch">
        <Frame27 />
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame18 />
    </div>
  );
}

function PolicyHeader1() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Policy Header">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[24px] relative size-full">
          <Frame17 />
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-[24px]">
      <p className="col-1 font-['Lexend:SemiBold',sans-serif] font-semibold leading-[normal] ml-0 mt-0 relative row-1 text-black tracking-[0.24px] w-[993px]">Unionization for Transportation Network Drivers</p>
      <p className="col-1 font-['Nunito:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-[34px] relative row-1 text-[#808080] tracking-[-0.625px] w-[993px]">Provide for unionization and collective bargaining for transportation network drivers</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0">
      <Group2 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      <p className="font-['Lexend:Thin',sans-serif] font-thin leading-[normal] relative shrink-0 text-[56px] text-black text-center tracking-[0.56px] w-[135px]">3</p>
      <Frame6 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-between relative shrink-0 w-[1196px]">
      <Frame12 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex h-[70px] items-center relative shrink-0 w-full">
      <div className="flex flex-row items-center self-stretch">
        <Frame28 />
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame20 />
    </div>
  );
}

function PolicyHeader2() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Policy Header">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[24px] relative size-full">
          <Frame19 />
        </div>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-[24px]">
      <p className="col-1 font-['Lexend:SemiBold',sans-serif] font-semibold leading-[1.3] ml-0 mt-0 relative row-1 text-black tracking-[0.24px] w-[993px]">Limited Legalization and Regulation of Certain Natural Psychedelic Substances</p>
      <p className="col-1 font-['Nunito:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-[35px] relative row-1 text-[#808080] tracking-[-0.625px] w-[993px]">Allow persons 21 years of age or older to grow, possess, and use natural psychedelic substances, as well as establish a commission to regulate the licensing of psychedelic substances and services</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0">
      <Group3 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      <p className="font-['Lexend:Thin',sans-serif] font-thin leading-[normal] relative shrink-0 text-[56px] text-black text-center tracking-[0.56px] w-[135px]">4</p>
      <Frame7 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-between relative shrink-0 w-[1196px]">
      <Frame13 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex h-[134px] items-center relative shrink-0 w-full">
      <div className="flex flex-row items-center self-stretch">
        <Frame29 />
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame22 />
    </div>
  );
}

function PolicyHeader3() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Policy Header">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[24px] relative size-full">
          <Frame21 />
        </div>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-[24px]">
      <p className="col-1 font-['Lexend:SemiBold',sans-serif] font-semibold leading-[normal] ml-0 mt-0 relative row-1 text-black tracking-[0.24px] w-[993px]">Minimum Wage for Tipped Workers</p>
      <p className="col-1 font-['Nunito:Regular',sans-serif] font-normal leading-[normal] ml-0 mt-[34px] relative row-1 text-[#808080] tracking-[-0.625px] w-[993px]">{`Increase the minimum wage for tipped employees to meet the state's standard minimum wage`}</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <Group4 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame33 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
      <p className="font-['Lexend:Thin',sans-serif] font-thin leading-[normal] relative shrink-0 text-[56px] text-black text-center tracking-[0.56px] w-[135px]">5</p>
      <Frame8 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-between relative shrink-0 w-[1196px]">
      <Frame14 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex h-[70px] items-center relative shrink-0 w-full">
      <div className="flex flex-row items-center self-stretch">
        <Frame30 />
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame24 />
    </div>
  );
}

function PolicyHeader4() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Policy Header">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[24px] relative size-full">
          <Frame23 />
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] h-[892px] items-start relative shrink-0 w-full">
      <PolicyHeader />
      <PolicyHeader1 />
      <PolicyHeader2 />
      <PolicyHeader3 />
      <PolicyHeader4 />
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <Frame31 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Header />
    </div>
  );
}

function PageContent() {
  return (
    <div className="h-[1731px] relative shrink-0 w-full" data-name="Page Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-[72px] pt-[24px] px-[90px] relative size-full">
          <Frame2 />
          <Frame9 />
        </div>
      </div>
    </div>
  );
}

function Links() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Nunito:Bold',sans-serif] font-bold items-start justify-between leading-[0] min-w-px relative text-[0px] text-justify text-white tracking-[-0.625px] whitespace-nowrap" data-name="Links">
      <div className="relative shrink-0">
        <p className="leading-[26px] mb-0 text-[14px]">Browse</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px]">Newsfeed</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px]">Testimonies</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px]">Policies</p>
        <p className="leading-[26px] mb-0 text-[14px]">Account</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px]">Profile</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] text-[12px]">Sign Out</p>
      </div>
      <div className="relative shrink-0">
        <p className="leading-[26px] mb-0 text-[14px]">Learn</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px]">Writing Effective Testimonies</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px]">Contacting Legislatures</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px]">Additional Resources</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px]">{`Our Privacy Policy & Terms of Service`}</p>
        <p className="leading-[26px] mb-0 text-[14px]">About</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px]">{`Our Mission & Goals`}</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] text-[12px]">Our Team</p>
      </div>
      <div className="relative shrink-0">
        <p className="leading-[26px] mb-0 text-[14px] whitespace-pre">{`Terms & Policies`}</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px] whitespace-pre">{`Privacy Policy `}</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px] whitespace-pre">{`Terms of Service `}</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] text-[12px] whitespace-pre">{`Code of Conduct `}</p>
      </div>
      <div className="relative shrink-0">
        <p className="leading-[26px] mb-0 text-[14px]">Resources</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px]">Find your Legislators</p>
        <p className="leading-[26px] mb-0 text-[14px]">Our Team</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px]">North Eastern University School of Law</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px]">Code for Boston</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] mb-0 text-[12px]">Boston College Law School</p>
        <p className="font-['Nunito:Regular',sans-serif] font-normal leading-[26px] text-[12px]">Harvard Berkman Klein Center</p>
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[1.14%_-0.31%_-1.14%_0.31%]" data-name="Mask group">
      <div className="absolute bg-[#1a3185] inset-[-11.06%_0_3.83%_-7.22%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[3.015px_4.88px] mask-size-[40px_40px]" style={{ maskImage: `url('${imgRectangle210}')` }} />
    </div>
  );
}

function SocialIcon2() {
  return (
    <div className="bg-white content-stretch flex items-start p-[10px] relative rounded-[60px] shrink-0" data-name="Social Icon 03">
      <div className="relative shrink-0 size-[20px]" data-name="Third Party/Social Media">
        <MaskGroup />
      </div>
    </div>
  );
}

function MaskGroup1() {
  return (
    <div className="absolute contents inset-[-0.17%_0_0.17%_0]" data-name="Mask group">
      <div className="absolute bg-[#1a3185] inset-[-6.16%_-7.77%_0.17%_1.78%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.714px_2.396px] mask-size-[40px_40px]" style={{ maskImage: `url('${imgRectangle211}')` }} />
    </div>
  );
}

function SocialIcon1() {
  return (
    <div className="bg-white content-stretch flex items-start p-[10px] relative rounded-[60px] shrink-0" data-name="Social Icon 02">
      <div className="relative shrink-0 size-[20px]" data-name="Third Party/Social Media">
        <MaskGroup1 />
      </div>
    </div>
  );
}

function SocialIcon() {
  return (
    <div className="bg-white content-stretch flex items-start p-[10px] relative rounded-[60px] shrink-0" data-name="Social Icon 01">
      <div className="relative shrink-0 size-[20px]" data-name="Third Party/Social Media">
        <div className="absolute bg-[#1a3185] inset-[-8.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[3.399px_3.399px] mask-size-[40px_40px]" style={{ maskImage: `url('${imgRectangle209}')` }} />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
      <SocialIcon2 />
      <SocialIcon1 />
      <SocialIcon />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative self-stretch shrink-0">
      <div className="relative rounded-[4px] shrink-0 w-full" data-name=".Button">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[8px] relative size-full">
            <div className="overflow-clip relative shrink-0 size-[25px]" data-name="Globe">
              <div className="absolute inset-[15%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
                  <path d={svgPaths.p2a370600} fill="var(--fill-0, white)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['Nunito:Bold',sans-serif] font-bold leading-[1.5] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">English</p>
            <div className="relative shrink-0 size-[25px]" data-name="Direction=Down">
              <div className="absolute flex inset-[34.94%_26.31%_24.94%_26.31%] items-center justify-center" style={{ containerType: "size" }}>
                <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
                  <div className="relative size-full" data-name="icon">
                    <div className="absolute inset-[9.64%_6.34%_0_6.34%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3429 9.06182">
                        <path d={svgPaths.p2e531600} fill="var(--fill-0, white)" id="icon" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 w-full" data-name="Social Menu">
        <p className="font-['Nunito:Medium',sans-serif] font-medium leading-[normal] min-w-full relative shrink-0 text-[16px] text-center text-white tracking-[0.24px] w-[min-content]">Follow MAPLE</p>
        <Frame />
      </div>
      <div className="h-[143px] overflow-clip relative shrink-0 w-[144px]" data-name="Tree-White Iteration">
        <div className="absolute inset-[9.12%_18.8%_38.32%_18.8%]" data-name="image 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
        </div>
        <div className="absolute inset-[63.76%_21.09%_23.96%_21.09%]" data-name="MAPLE">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 83.247 17.5725">
            <g id="MAPLE">
              <path d={svgPaths.p3ed2d900} fill="var(--fill-0, white)" />
              <path d={svgPaths.p6904a80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p37625340} fill="var(--fill-0, white)" />
              <path d={svgPaths.p15676500} fill="var(--fill-0, white)" />
              <path d={svgPaths.p19287280} fill="var(--fill-0, white)" />
            </g>
          </svg>
        </div>
        <div className="absolute inset-[79.57%_20.14%_9.12%_20.14%]" data-name="Massachusetts Platform for Legislative Engagement">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 86.0078 16.1764">
            <g id="Massachusetts Platform for Legislative Engagement">
              <path d={svgPaths.p73e0370} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3dba1900} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1619fa00} fill="var(--fill-0, white)" />
              <path d={svgPaths.pdc9f200} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3a7e3080} fill="var(--fill-0, white)" />
              <path d={svgPaths.p215cce00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2b14f280} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3527ab00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p15d1dc00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p25ac4d00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p24290400} fill="var(--fill-0, white)" />
              <path d={svgPaths.p29939100} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3e22900} fill="var(--fill-0, white)" />
              <path d={svgPaths.p39279300} fill="var(--fill-0, white)" />
              <path d={svgPaths.p37752d80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3ed86280} fill="var(--fill-0, white)" />
              <path d={svgPaths.p18521700} fill="var(--fill-0, white)" />
              <path d={svgPaths.pdc41280} fill="var(--fill-0, white)" />
              <path d={svgPaths.p19a30900} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3234ac00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p32d49b80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p23adc180} fill="var(--fill-0, white)" />
              <path d={svgPaths.p33c24b00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p26927f00} fill="var(--fill-0, white)" />
              <path d={svgPaths.pf553100} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1e4979f0} fill="var(--fill-0, white)" />
              <path d={svgPaths.p36f55b80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p311e2540} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2f9fb000} fill="var(--fill-0, white)" />
              <path d={svgPaths.p113beec0} fill="var(--fill-0, white)" />
              <path d={svgPaths.p31619840} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2d7be000} fill="var(--fill-0, white)" />
              <path d={svgPaths.p65d5800} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1ec5480} fill="var(--fill-0, white)" />
              <path d={svgPaths.p223ad500} fill="var(--fill-0, white)" />
              <path d={svgPaths.p21b94b00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p631b880} fill="var(--fill-0, white)" />
              <path d={svgPaths.p26d1600} fill="var(--fill-0, white)" />
              <path d={svgPaths.pc183d80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p15db3d00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p96af500} fill="var(--fill-0, white)" />
              <path d={svgPaths.p34790c80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1834e300} fill="var(--fill-0, white)" />
              <path d={svgPaths.p7c40600} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3a2dc500} fill="var(--fill-0, white)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[40px] items-start relative shrink-0 w-full" data-name="Content">
      <Links />
      <Frame1 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[1]">
      <PageContent />
      <div className="bg-black relative shrink-0 w-full" data-name="Footer">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col gap-[10px] items-center justify-center p-[24px] relative size-full">
            <Content />
            <p className="absolute font-['Nunito:SemiBold',sans-serif] font-semibold leading-[1.25] left-[52px] text-[12px] text-justify text-white top-[247px] tracking-[0.36px] whitespace-nowrap">MAPLE is an independent project, not affiliated with the Massachusetts legislature</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimony() {
  return (
    <div className="bg-[#ededed] content-stretch flex flex-col isolate items-start relative size-full" data-name="Testimony">
      <Navbar />
      <Frame26 />
    </div>
  );
}