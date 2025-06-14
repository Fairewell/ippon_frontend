import React, { useState } from "react";
import { about_inf } from "../constants/about_info";

type NavKey = keyof typeof about_inf[0]['navs'];
type StepKey = keyof typeof about_inf[0]['steps'];

interface Step {
  id: number;
  title: string;
  desk: string;
  titles: { id: number; title: string }[];
}

const AboutParagraph = () => {
    const [selectedNav, setSelectedNav] = useState<NavKey>('nav3');
    const [selectedTitle, setSelectedTitle] = useState<StepKey>('title1');
    const [activeStepId, setActiveStepId] = useState<number | null>(null);

    const handleTitleClick = (nav: NavKey, title: StepKey) => {
        setSelectedNav(nav);
        setSelectedTitle(title);
    };

    const handleActiveClick = (stepID: number) => {
        setActiveStepId(activeStepId === stepID ? null : stepID);
    };

    const styles = {
        step_content_: {
            maxHeight: 0,
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
        },
        step_content_open: {
            transition: 'max-height 0.3s ease',
            maxHeight: '1000px',
        },
    };

    return (
        <div className="transition-all transition-duration-400ms p-4 flex flex-col">
            <div className="nav transition-all">
                <ul className=" list-none flex flex-wrap flex-row mx-6 justify-center transition-opacity">
                    {(Object.keys(about_inf[0].navs) as NavKey[]).map((nav, index) => (
                        <li key={index} onClick={() => handleTitleClick(nav, about_inf[0].navs[nav][0].titlename as StepKey)} className={`xs:text-xl xs:hover:text-2xl hover:text-3xl text-2xl font-merriweather m-6 cursor-pointer ${selectedNav === nav ? "text-[#FF4000] font-bold" : "text-black"} hover:text-[#FF4000] transition-all duration-300 ease-in-out`}>
                            {about_inf[0].navs[nav][0].howname}
                        </li>
                    ))}
                </ul>
                <h2 className="xs:text-[16px] text-xl italic font-merriweather transition-all transition-duration-400ms flex flex-row mx-6 transition duration-300 ease-in-out justify-center text-center">{about_inf[0].navs[selectedNav][0].title}</h2>
            </div>
            <div className="step-render rounded-xl p-6 my-8 items-center">
                {about_inf[0].steps[selectedTitle].map((step: Step) => (
                    <div key={step.id} className={`rounded-xl p-6 bg-gray-50 my-8 ${step.id === activeStepId ? 'open' : ''}`}>
                        <div className="flex flex-wrap">
                            <span className="xs:text-[24px] text-[36px] font-raleway font-bold transition-all transition-duration-400ms flex flex-row transition duration-300 ease-in-out">
                                {step.title}
                            </span>
                            <button
                                type="button"
                                className="transition-all hover:text-4xl lining-nums text-[#FF4400] text-3xl z-30 flex h-full mx-4 cursor-pointer focus:outline-none"
                                onClick={() => handleActiveClick(step.id)}
                            >
                                {activeStepId === step.id ? '-' : '+'}
                            </button>
                        </div>
                        <span className="font-raleway font-semibold mt-5">{step.desk}</span>
                        <div className={`step-content_${activeStepId === step.id ? 'open' : ''}`} style={activeStepId === step.id ? styles.step_content_open : styles.step_content_}>
                            {step.titles.map((subStep) => (
                                <div key={subStep.id} className="my-2 ml-4">
                                    <p className="font-raleway font-medium my-2">{subStep.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutParagraph;