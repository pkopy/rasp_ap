import React from 'react';
import Content from "./components/Content";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import dotenv from 'dotenv'

dotenv.config()
const wifi = { name: 'kkkk', ssid: '664364374834838' }
// const listWifi = Array(20).fill(wifi)

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
function App() {
const [listWifi, setWifiList] = React.useState([])
React.useEffect(() => {
    fetch(`http://${process.env.REACT_APP_API}:9000/findwifi`)
        .then(data => data.json())
        .then(data => {
            // const wifi = data.split('\n')
            setWifiList(data)
            // console.log(wifi)
        })
},[])
console.log(process.env.REACT_APP_PORT)



    const classes = useStyles();

    return (
        <div 
        className={classes.root}
        >
            <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            THBR WIFI Connector
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>

            <Content
                wifiList={listWifi}
            />

        </div>
    );
}

export default App;
