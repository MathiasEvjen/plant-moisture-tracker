import leavesImg from "./assets/leaves.png"
import leavesDyingImg from "./assets/leaves_dying.png"

const FishBowl = (props) => {
    // Setter variabler for størrelsen på fiskebollen
    const radius = 170;
    const thickness = 15;
    const normalizedRadius = radius - thickness / 2;

    // Setter tekst, styling og bilde utifra type data og fuktighetsnivå
    const pctText = props.isData ? props.moistureData + "%" : props.moistureData;
    const pctStyle = props.isData ? "pct-text" : "pct-text-no-data";
    const leaves = props.pct < 20 && props.isData ? leavesDyingImg : leavesImg;

    return(
        <div className="flex items-center justify-center">
            {/* Fiskebolle-grafikk */}
            <svg
                height={radius * 2}
                width={radius * 2}
                viewBox={`0 0 ${radius * 2} ${radius * 2}`}
                >
                    {/* Definerer SVG-elementer */}
                    <defs>
                        {/* Pattern for bilde av blader */}
                        <pattern
                            id="image-pattern"
                            patternUnits="userSpaceOnUse"
                            width={radius * 2}
                            height={radius * 2}
                        >
                            {/* Størrelse og plassering på bilde */}
                            <image
                                href={leaves}    
                                x="8%"
                                y="14%"
                                width={radius * 1.5}
                                height={radius}
                                preserveAspectRatio="xMidYMid slice"
                            />
                        </pattern>

                        {/* Mask for fiskebollen */}
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
                    
                    {/* Bakgrunnen i fiskebollen */}
                    <circle 
                        className="circle"
                        cx={radius}
                        cy={radius}
                        r={normalizedRadius}
                        fill="#ddd"
                        
                    />

                    {/* Vannet i fiskebollen */}
                    <circle 
                        cx={radius}
                        cy={radius}
                        r={normalizedRadius}
                        fill="deepskyblue"
                        mask="url(#fill-mask)"
                        opacity="0.7"
                    />

                    {/* Kanten på fiskebollen */}
                    <circle
                        cx={radius}
                        cy={radius}
                        r={normalizedRadius}
                        fill="transparent"
                        stroke="#bf7136"
                        strokeWidth={thickness} 
                    />

                    {/* Bildet av bladene */}
                    <circle 
                        cx={radius}
                        cy={radius}
                        r={normalizedRadius}
                        fill="url(#image-pattern)"
                    />
                    
                    {/* Teksten i fiskebollen */}
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