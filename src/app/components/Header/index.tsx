"use client";
import { axiosl } from "@/app/store/axios";
import React from "react";
import "./index.css";
import { IntroductionContent } from "@/app/interfaces/common";
import UiButton from "../UiButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
	const [introduction, setIntroduction] =
		React.useState<IntroductionContent | null>(null);
	const pathName = usePathname();

	console.log(pathName);

	React.useEffect(() => {
		axiosl
			.get("introduction")
			.then((res) => {
				setIntroduction(res.data[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// const contacts = [
	//   {
	//     name: "phone",
	//     label: "Phone",
	//     icon: (
	//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	//         <path d="M16.1842 2.75H7.81584C6.8176 2.75 6.00836 3.58287 6.00836 4.61028V19.3897C6.00836 20.4171 6.8176 21.25 7.81584 21.25H16.1842C17.1824 21.25 17.9916 20.4171 17.9916 19.3897V4.61028C17.9916 3.58287 17.1824 2.75 16.1842 2.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	//         <path d="M12 18.7734C12.2868 18.7734 12.5193 18.5409 12.5193 18.2541C12.5193 17.9674 12.2868 17.7349 12 17.7349C11.7132 17.7349 11.4807 17.9674 11.4807 18.2541C11.4807 18.5409 11.7132 18.7734 12 18.7734Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	//         <path d="M10.0027 5.27234H13.9972" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	//       </svg>
	//     )
	//   },
	//   {
	//     name: "email",
	//     label: "Email",
	//     icon: (
	//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	//         <path d="M21.25 10.7449V16.5C21.25 17.5609 20.8286 18.5783 20.0784 19.3284C19.3283 20.0786 18.3109 20.5 17.25 20.5H6.75C5.68913 20.5 4.67172 20.0786 3.92157 19.3284C3.17143 18.5783 2.75 17.5609 2.75 16.5V7.5C2.75 6.43913 3.17143 5.42172 3.92157 4.67157C4.67172 3.92143 5.68913 3.5 6.75 3.5L13.9013 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	//         <path d="M2.75 7.58997L10 11.72C10.606 12.077 11.2966 12.2653 12 12.2653C12.7034 12.2653 13.394 12.077 14 11.72L16.2189 10.4634" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	//         <circle cx="19" cy="5" r="2.5" stroke="currentColor" stroke-width="1.5"/>
	//       </svg>
	//     )
	//   },
	//   {
	//     name: "location",
	//     label: "Location",
	//     icon: (
	//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	//         <path d="M12 12.7998C13.8502 12.7998 15.3499 11.3001 15.3499 9.4499C15.3499 7.59978 13.8502 6.09995 12 6.09995C10.1498 6.09995 8.65004 7.59978 8.65004 9.4499C8.65004 11.3001 10.1498 12.7998 12 12.7998Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
	//         <path d="M12 2.75C5.3001 2.75 4.18345 8.33325 5.3001 12.5654C6.28275 16.2726 9.23071 18.8074 11.1737 20.8844C11.2783 20.9995 11.4059 21.0915 11.5482 21.1545C11.6905 21.2175 11.8444 21.25 12 21.25C12.1556 21.25 12.3095 21.2175 12.4518 21.1545C12.594 21.0915 12.7217 20.9995 12.8263 20.8844C14.7693 18.8074 17.7172 16.2726 18.6999 12.5654C19.8165 8.33325 18.6999 2.75 12 2.75Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
	//       </svg>
	//     )
	//   },
	//   {
	//     name: "dob",
	//     label: "DOB",
	//     icon: (
	//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	//         <path d="M17 4.625H7C4.79086 4.625 3 6.41586 3 8.625V17.375C3 19.5841 4.79086 21.375 7 21.375H17C19.2091 21.375 21 19.5841 21 17.375V8.625C21 6.41586 19.2091 4.625 17 4.625Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	//         <path d="M3 9.625H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	//         <path d="M17 2.625V6.625" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	//         <path d="M7 2.625V6.625" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	//         <path d="M9.5 14.9885H14.5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
	//       </svg>
	//     )
	//   },
	// ]

	const headerItems = [
		{
			name: "home",
			label: "Home",
			to: "/",
			type: "menu",
		},
		{
			name: "projects",
			label: "Projects",
			to: "#projects",
			type: "menu",
		},
		{
			name: "downloadCV",
			label: "Download CV",
			icon: (
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M14.186 2.75293V6.3487C14.186 6.83643 14.3805 7.30418 14.7267 7.64905C15.0729 7.99393 15.5424 8.18768 16.032 8.18768H20.157"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M20.25 8.56776V17.136C20.23 17.696 20.0995 18.2466 19.8658 18.7563C19.632 19.266 19.2998 19.7248 18.8879 20.1065C18.4761 20.4881 17.9927 20.7852 17.4656 20.9806C16.9384 21.176 16.3777 21.266 15.8156 21.2454H8.22563C7.66013 21.2716 7.09505 21.1857 6.5631 20.9928C6.03115 20.7999 5.54291 20.5037 5.12664 20.1215C4.71037 19.7393 4.37436 19.2786 4.13805 18.7662C3.90175 18.2537 3.76985 17.6996 3.75 17.136V6.86233C3.76995 6.30232 3.90052 5.75172 4.13424 5.24201C4.36795 4.73231 4.70024 4.2735 5.11208 3.89184C5.52393 3.51017 6.00726 3.21313 6.53443 3.01769C7.0616 2.82226 7.62227 2.73228 8.18438 2.75288H13.8975C14.7704 2.74996 15.6128 3.07246 16.2591 3.65696L19.2188 6.37947C19.5351 6.65177 19.7904 6.98732 19.9681 7.36432C20.1457 7.74132 20.2418 8.15135 20.25 8.56776Z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M12 17.2727L12 10.4988"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-miterlimit="10"
						stroke-linecap="round"
					/>
					<path
						d="M8.89355 14.4209L11.5589 17.0862C11.6166 17.1444 11.6853 17.1906 11.761 17.2222C11.8367 17.2537 11.9179 17.27 11.9999 17.27C12.082 17.27 12.1632 17.2537 12.2389 17.2222C12.3146 17.1906 12.3833 17.1444 12.441 17.0862L15.1063 14.4209"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			),
			to: "/projects",
			type: "button",
		},
	];

	return (
		<div className="header-container">
			<div className="left-section"></div>
			<div className="right-section">
				<ul className="menu">
					{headerItems.map((hi) => (
						<React.Fragment key={`item-main-${hi.name}`}>
							{hi.type === "menu" ? (
								<li className={`item`} key={`item-${hi.name}`}>
									<Link href={hi.to}>{hi.label}{hi.to === pathName && <span className="active-item"></span> }</Link>
								</li>
							) : (
								<li className="item" key={`item-${hi.name}`}>
									<Link href={hi.to} target="_blank">
										<UiButton value="Download CV" glyphIcon={hi.icon} />
									</Link>
								</li>
							)}
						</React.Fragment>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Header;
