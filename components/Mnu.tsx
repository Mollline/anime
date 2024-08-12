import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { useRouter } from "expo-router";

const genres = [
  "Action",
  "Adventure",
  "Fantasy",
  "Romance",
  "Drama",
  "Comedy",
  "Horror",
];
const mo = ["Events", "Movie", "Genre"];

export default function Mnu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const home = () => {
    router.push("");
    handleClose();
  };
  const ubbed = () => {
    router.push("ubbed");
    handleClose();
  };
  const animeRating = () => {
    router.push("anime_rating");
    handleClose();
  };
  const getColorByIndex = (index: number) => {
    switch (index) {
      case 0:
        return "green";
      case 1:
        return "red";
      case 2:
        return "purple";
      case 3:
        return "brown";
      case 4:
        return "orange";
      case 5:
        return "blue";
      case 6:
        return "black";
      default:
        return "black";
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <TouchableOpacity>
          <Image
            style={{ width: 25, height: 25, marginRight: 20 }}
            source={require("../assets/images/main-menu.png")}
          />
        </TouchableOpacity>
      </Button>
      <Menu id="basic-menu" anchorEl={anchorEl} open={open}>
        <MenuItem
          onClick={handleClose}
          style={{
            backgroundColor: "grey",
            borderRadius: "10px",
            margin: "0px 10px",
          }}
        >
          Close menu
        </MenuItem>
        <MenuItem onClick={home}>Home</MenuItem>
        <MenuItem onClick={animeRating}>Anime rating</MenuItem>
        <MenuItem onClick={ubbed}>Subbed anime</MenuItem>
        <MenuItem onClick={ubbed}>Dubbed anime</MenuItem>
        {mo.map((a) => (
          <a
            href="https://melbet-mn.com/en?tag=d_2009169m_59347c_[]MS[]null[]SmartCPM[]general[]6534229_d85292_l99356_clickunder"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem onClick={handleClose}>{a}</MenuItem>
          </a>
        ))}
        <MenuItem
          style={{
            width: "200px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {genres.map((genre, index) => (
            <div
              key={genre}
              style={{
                fontSize: 14,
                color: getColorByIndex(index),
              }}
            >
              {genre}
            </div>
          ))}
        </MenuItem>
      </Menu>
    </div>
  );
}
