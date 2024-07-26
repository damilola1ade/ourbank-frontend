export const buttonStyles = {
  components: {
    Button: {
      variants: {
        "no-hover": {
          _hover: {
            boxShadow: "none",
          },
        },
        "transparent-with-icon": {
          fontWeight: "bold",
          borderRadius: "inherit",
          cursor: "pointer",
          _active: {
            transform: "none",
            borderColor: "transparent",
          },
          _focus: {
            boxShadow: "none",
          },
          _hover: {
            boxShadow: "none",
          },
        },
      },
      baseStyle: {
        borderRadius: "15px",
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
};
