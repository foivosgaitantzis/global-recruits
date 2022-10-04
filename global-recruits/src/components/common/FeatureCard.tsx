export default function FeatureCard(props: { icon: "book" | "group" | "trophy", header: string, children: string, }) {
    return (
        <div className="block mx-auto mt-12">
            <div className="w-12 mx-auto mb-4">
                {props.icon === "book"
                    ? <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 482.204 482.204" xmlSpace="preserve">
                        <g>
                            <g>
                                <path d="M83.127,344.477c54.602,1.063,101.919,9.228,136.837,23.613c0.596,0.244,1.227,0.366,1.852,0.366
                                    c0.95,0,1.895-0.279,2.706-0.822c1.349-0.902,2.158-2.418,2.158-4.041l0.019-261.017c0-1.992-1.215-3.783-3.066-4.519
                                    L85.019,42.899c-1.496-0.596-3.193-0.411-4.527,0.494c-1.334,0.906-2.133,2.413-2.133,4.025v292.197
                                    C78.359,342.264,80.479,344.425,83.127,344.477z"/>
                                <path d="M480.244,89.256c-1.231-0.917-2.824-1.198-4.297-0.759l-49.025,14.657
                           c-2.06,0.616-3.471,2.51-3.471,4.659v252.151c0,0,0.218,3.978-3.97,3.978c-4.796,0-7.946,0-7.946,0
                           c-39.549,0-113.045,4.105-160.93,31.6l-9.504,5.442l-9.503-5.442c-47.886-27.494-121.381-31.6-160.93-31.6c0,0-8.099,0-10.142,0
                           c-1.891,0-1.775-2.272-1.775-2.271V107.813c0-2.149-1.411-4.043-3.47-4.659L6.256,88.497c-1.473-0.439-3.066-0.158-4.298,0.759
                           S0,91.619,0,93.155v305.069c0,1.372,0.581,2.681,1.597,3.604c1.017,0.921,2.375,1.372,3.741,1.236
                           c14.571-1.429,37.351-3.131,63.124-3.131c56.606,0,102.097,8.266,131.576,23.913c4.331,2.272,29.441,15.803,41.065,15.803
                           c11.624,0,36.733-13.53,41.063-15.803c29.48-15.647,74.971-23.913,131.577-23.913c25.771,0,48.553,1.702,63.123,3.131
                           c1.367,0.136,2.725-0.315,3.742-1.236c1.016-0.923,1.596-2.231,1.596-3.604V93.155C482.203,91.619,481.476,90.173,480.244,89.256z
                           "/>
                                <path d="M257.679,367.634c0.812,0.543,1.757,0.822,2.706,0.822c0.626,0,1.256-0.122,1.853-0.366
                           c34.917-14.386,82.235-22.551,136.837-23.613c2.648-0.052,4.769-2.213,4.769-4.861V47.418c0-1.613-0.799-3.12-2.133-4.025
                           c-1.334-0.904-3.031-1.09-4.528-0.494L258.569,98.057c-1.851,0.736-3.065,2.527-3.065,4.519l0.019,261.017
                           C255.521,365.216,256.331,366.732,257.679,367.634z"/>
                            </g>
                        </g>
                    </svg>

                    : props.icon === "group"
                        ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96.979 96.979"
                            xmlSpace="preserve">
                            <g>
                                <g>
                                    <path d="M59.07,46.021L59.07,46.021c4.576-3.373,7.31-8.754,7.31-14.393c0-9.863-8.025-17.889-17.89-17.889
                               c-9.864,0-17.889,8.025-17.889,17.889c0,5.717,2.66,10.959,7.297,14.385c-18.244,6.451-21.092,28.71-21.531,35.378
                               c-0.031,0.479,0.137,0.949,0.465,1.3c0.328,0.35,0.785,0.549,1.264,0.549h60.788c0.479,0,0.938-0.199,1.266-0.549
                               c0.328-0.351,0.496-0.82,0.465-1.3C80.175,74.736,77.32,52.511,59.07,46.021z"/>
                                    <path d="M82.761,46.861c3.02-2.227,4.821-5.779,4.821-9.502c0-6.508-5.297-11.805-11.807-11.805c-1.867,0-3.627,0.447-5.199,1.223
                               c0.345,1.564,0.529,3.184,0.529,4.852c0,4.68-1.484,9.219-4.137,12.988c10.448,6.572,14.981,18.07,16.944,26.81h11.923
                               c0.315,0,0.618-0.131,0.836-0.361c0.215-0.23,0.325-0.541,0.305-0.857C96.688,65.812,94.805,51.144,82.761,46.861z"/>
                                    <path d="M29.976,44.617c-2.654-3.748-4.104-8.238-4.104-12.988c0-1.668,0.188-3.287,0.531-4.852
                               c-1.572-0.775-3.332-1.223-5.199-1.223c-6.51,0-11.807,5.297-11.807,11.805c0,3.775,1.754,7.236,4.816,9.496
                               C2.172,51.113,0.291,65.806,0.002,70.207c-0.021,0.316,0.09,0.627,0.307,0.857c0.217,0.229,0.52,0.36,0.836,0.36H13.06
                               C15.019,62.685,19.543,51.179,29.976,44.617z"/>
                                </g>
                            </g>
                        </svg>
                        : props.icon === "trophy"
                            ? <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 462 462" xmlSpace="preserve">
                                <g id="XMLID_451_">
                                    <rect id="XMLID_452_" x="110" y="431" width="241" height="30" />
                                    <path id="XMLID_453_" d="M379.428,54l10.555-53H72.017l10.56,53H0v19.833c0,42.889,13.804,83.477,39.918,117.375
                               c24.126,31.318,57.826,54.752,95.362,66.452c17.925,24.11,44.801,42.737,75.72,48.485V351h-71v50h181v-50h-70v-44.851
                               c30.971-5.745,57.881-24.386,75.802-48.515c37.504-11.708,71.172-35.131,95.28-66.426C448.196,157.31,462,116.722,462,73.833V54
                               H379.428z M41.323,94h49.249l21.952,109.825C73.969,179.97,47.396,139,41.323,94z M231,278v-30
                               c27.953,0,52.535-24.573,57.956-47.523l29.197,6.896C309.952,242.09,275.11,278,231,278z M349.5,203.81L371.438,94h49.239
                               C414.606,139,388.042,179.954,349.5,203.81z"/>
                                </g>
                            </svg>
                            : null
                }
            </div>
            <div className="text-lg text-justify">
                <span className="font-bold">{props.header}</span>
                <br />
                {props.children}
            </div>
        </div>
    );
}