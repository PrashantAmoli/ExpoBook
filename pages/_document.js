import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="theme-color" content="#000000" />
				<meta
					name="description"
					content="EaseMyExpo is the Exhibtion Management System that helps you to manage your exhibition in a very easy way. It is a complete solution for your exhibition connecting all 4 pillars organizers, exhibitors, vendors, & visitors."
				/>
				<meta
					name="keywords"
					content="Exhibition Management System, Exhibition Management Software, Exhibition Management App, Exhibition Management Platform, Exhibition Management Solution, Exhibition Management Company, Exhibition Management Services, Exhibition Management System India, Exhibition Management System Delhi, Exhibition Management System Mumbai, Exhibition Management System Bangalore, Exhibition Management System Chennai, Exhibition Management System Kolkata, Exhibition Management System Hyderabad, Exhibition Management System Pune, Exhibition Management System Ahmedabad, Exhibition Management System Surat, Exhibition Management System Jaipur, Exhibition Management System Lucknow, Exhibition Management System Kanpur, Exhibition Management System Nagpur, Exhibition Management System Indore, Exhibition Management System Thane, Exhibition Management System Bhopal, Exhibition Management System Visakhapatnam, Exhibition Management System Pimpri-Chinchwad, Exhibition Management System Patna Exhibitors, Vendors, Visitors, Organizers, SaaS, Product, Booking, Ticketing, Payment, Registration, Lead Generation, Lead Management, Lead Tracking, Lead Scoring, Lead Nurturing, Lead Conversion, Lead Qualification, Lead Distribution, Lead Analytics, Lead Reporting, Lead Engagement, Lead Followup, Lead Retargeting, Lead Conversion, Lead Generation, Lead Management, Lead Tracking, Lead Scoring, Lead Nurturing, Lead Conversion, Lead Qualification, Lead Distribution, Lead Analytics, Lead Reporting, Lead Engagement, Lead Followup, Lead Retargeting, Lead Conversion, "
				/>
				<meta name="author" content="EaseMyExpo" />
				<meta name="robots" content="index, follow" />
				<meta name="googlebot" content="index, follow" />
				<meta name="google" content="notranslate" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="application-name" content="EaseMyExpo" />
				<meta name="msapplication-TileColor" content="#000000" />
				{/* <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" /> */}
				{/* <meta name="msapplication-square70x70logo" content="/ms-icon-70x70.png" /> */}
				{/* <meta name="msapplication-square150x150logo" content="/ms-icon-150x150.png" /> */}
				{/* <meta name="msapplication-wide310x150logo" content="/ms-icon-310x150.png" /> */}
				{/* <meta name="msapplication-square310x310logo" content="/ms-icon-310x310.png" /> */}
				<meta name="theme-color" content="#000000" />
				<meta name="msapplication-navbutton-color" content="#000000" />
				<meta name="apple-mobile-web-app-status-bar-style" content="#000000" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-title" content="EaseMyExpo" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="HandheldFriendly" content="True" />
				<meta name="MobileOptimized" content="320" />
				<meta name="apple-touch-fullscreen" content="yes" />
				<meta name="referrer" content="no-referrer-when-downgrade" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@easemyexpo" />
				<meta name="twitter:creator" content="@easemyexpo" />
				<meta name="twitter:title" content="EaseMyExpo" />
				<meta
					name="twitter:description"
					content="EaseMyExpo is the Exhibtion Management System that helps you to manage your exhibition in a very easy way. It is a complete solution for your exhibition connecting all 4 pillars organizers, exhibitors, vendors, & visitors."
				/>
				<meta name="twitter:image" content="https://easemyexpo.com/images/easemyexpo-logo.png" />
				<meta property="og:title" content="EaseMyExpo" />
				<meta
					property="og:description"
					content="EaseMyExpo is the Exhibtion Management System that helps you to manage your exhibition in a very easy way. It is a complete solution for your exhibition connecting all 4 pillars organizers, exhibitors, vendors, & visitors."
				/>
				<meta property="og:image" content="https://easemyexpo.com/images/easemyexpo-logo.png" />
				<meta property="og:url" content="https://easemyexpo.com/" />
				<meta property="og:site_name" content="EaseMyExpo" />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="en_US" />
				<meta property="og:locale:alternate" content="en_US" />
				<meta property="og:locale:alternate" content="en_GB" />
				<meta property="og:locale:alternate" content="en_IN" />
				<meta property="og:locale:alternate" content="en_CA" />
				<meta property="og:locale:alternate" content="en_IE" />
				<meta property="og:locale:alternate" content="en_AU" />
				<meta property="og:locale:alternate" content="en_NZ" />
				<meta property="og:locale:alternate" content="en_ZA" />
				<meta property="og:locale:alternate" content="en_JM" />
				<meta property="og:locale:alternate" content="en" />
			</Head>

			<body className="overflow-x-hidden transition-all duration-1000 dark:duration-1000 dark:transition-all scroll-smooth dark:scroll-smooth bg-gradient-to-br from-stone-100 via-blue-100/50 to-stone-100 dark:bg-gradient-to-br dark:from-blue-950/5 dark:via-blue-950/5 dark:to-blue-950/10 ">
				{/* <Script
					src="https://tally.so/widgets/embed.js"
					strategy="beforeInteractive"
					onLoad={() => {
						Tally.loadEmbeds();
					}}
				/> */}

				<Main />

				<NextScript />
			</body>
		</Html>
	);
}
