import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import ListItem from '@material-ui/core/ListItem';
import WifiIcon from '@material-ui/icons/Wifi';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    wifi: {
        // border: '1px solid',
        width: '90%',
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
        marginLeft: 'auto',
        marginRight: 'auto'

    },
    textField: {
        width: '100%'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Content = ({ styles, wifiList }) => {
    const [wifi, setWifi] = React.useState([]);
    const [pass, setPass] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const [currentWifi, setCurrentWifi] = React.useState({})
    const [connect, setConnect] = React.useState(false)
    const handleClickOpen = (elem) => {
        setCurrentWifi(elem)
        setOpen(true);
        setPass('')
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleValue = (e) => {
        // console.log(e.target.value)
        setPass(e.target.value)
    }
    const setAP = () => {
        console.log(pass)
        console.log(currentWifi)
        fetch(`http://${process.env.REACT_APP_API}:9000/findwifi/?ssid=${currentWifi.SSID}&pass=${pass}`)
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
    React.useEffect(() => {
        fetch(`http://10.10.2.230:9000/findwifi`)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                // wifiList = data.data
                // wifiList.shift()

                data.shift()
                if (data[data.length - 1] === "ff/an") {
                    setConnect(false)
                } else {
                    setConnect(true)
                }
                // const wifi = data.split('\n')
                setWifi(data)
            })
            .catch(err => console.log(err))
    }, [])
    // React.useEffect(() => {
    //     // return
    //     // console.log(cd)
    // }, [wifi])
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.wifi}>
                {wifi.length > 0 && !connect && <List >
                    {wifi.map((elem, i) =>
                        (
                            <ListItem button key={i} onClick={() => handleClickOpen(elem)} >
                                <WifiIcon></WifiIcon>
                                <ListItemText variant="h5" component="h3" style={{ marginLeft: '1rem', borderBottom: '1px solid rgb(0,0,0,0.25)' }}>
                                    <b>Name:</b> {elem.SSID}  <b>Address:</b> {elem.Address}
                                </ListItemText>

                            </ListItem>
                        )
                    )}

                </List>}
                {connect &&
                    <div>
                        Jesteś podłączony do sieci {wifi[wifi.length - 1]}
                        <Button onClick={handleClose} color="primary">
                            Anuluj
                        </Button>

                    </div>
                }

            </Paper>
            <Dialog
                open={open}
                // onEntered={}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Wprowadź hasło do sieci "}{currentWifi.SSID}</DialogTitle>
                <DialogContent>
                    {/* {currentWifi && <DialogContentText id="alert-dialog-slide-description">
                        {currentWifi.SSID}
                    </DialogContentText>} */}
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        className={classes.textField}
                        //    type="password"
                        onChange={handleValue}
                        value={pass}
                        autoComplete="off"
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Anuluj
                     </Button>
                    <Button onClick={setAP} color="primary">
                        Połącz
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default Content;