import leavesImg from "./assets/leaves.png"
import leavesDyingImg from "./assets/leaves_dying.png"

const FishBowl = (props) => {
    const radius = 155;
    const thickness = 10;
    const normalizedRadius = radius - thickness / 2;

    const pctText = props.isData ? props.moistureData + "%" : props.moistureData;
    const pctStyle = props.isData ? "pct-text" : "pct-text-no-data";

    const leaves = props.pct < 20 && props.isData ? leavesDyingImg : leavesImg;

    return(
        <div className="flex items-center justify-center">
            <svg
                height={radius * 2}
                width={radius * 2}
                viewBox={`0 0 ${radius * 2} ${radius * 2}`}
                >
                    <defs>
                        <pattern
                            id="image-pattern"
                            patternUnits="userSpaceOnUse"
                            width={radius * 2}
                            height={radius * 2}
                        >
                            <image
                                href={leaves}    
                                x="5%"
                                y="13%"
                                width={radius * 1.6}
                                height={radius}
                                preserveAspectRatio="xMidYMid slice"
                            />
                        </pattern>
                        <mask id="fill-mask">
                            <rect
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                                fill="white" 
                            />

                            <rect
                                x="0"
                                y="0" 
                                rotate=""
                                width="100%"
                                height="100%"
                                fill="black" 
                                style={{
                                    transform: `translateY(${(props.pct) * -1}%)`,
                                    transition: "transform 0.5s ease-in-out"
                                }}
                            />
                        </mask>
                    </defs>

                    <circle 
                        className="circle"
                        cx={radius}
                        cy={radius}
                        r={normalizedRadius}
                        fill="#ddd"
                        
                    />

                    <circle 
                        cx={radius}
                        cy={radius}
                        r={normalizedRadius}
                        fill="deepskyblue"
                        mask="url(#fill-mask)"
                        opacity="0.7"
                    />

                    <circle
                        cx={radius}
                        cy={radius}
                        r={normalizedRadius}
                        fill="transparent"
                        stroke="#bf7136"
                        strokeWidth={thickness} 
                    />

                    <circle 
                        cx={radius}
                        cy={radius}
                        r={normalizedRadius}
                        fill="url(#image-pattern)"
                    />
                    
                    <text
                        className={pctStyle}
                        x="50%"
                        y="75%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        color="black"> 
                        {pctText}
                    </text>
            </svg>
        </div>
    )
}

export default FishBowl