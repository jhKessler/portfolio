import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      boxShadow: {
        'glow': '0 0 20px #5832C9, 0 0 5px #5832C9, 0 0 5px #5832C9',
      },
      colors: {
        primary: "#5832C9",
        primaryHover: "#7F5AED",
        fontGray: "#8c8c8c",
        darkGray: "#363535"
      }
    },
  },
  plugins: [],
});