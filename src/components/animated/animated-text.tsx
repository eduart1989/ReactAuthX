import { animated, useSpring } from "react-spring";

export const AnimatedText: React.FC<{ name: string }> = ({ name }) => {
  const welcomeSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  return (
    <animated.div style={welcomeSpring}>
      <div>
        <h3> {name}</h3>
      </div>
    </animated.div>
  );
};
