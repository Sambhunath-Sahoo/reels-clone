import * as React from 'react';
import './Signup.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

import insta from '../Assets/Instagram.JPG'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export default function Login() {

    // appled manual style for card
    const useStyles = makeStyles({
        text1: {
            color: 'gray',
            textAlign: 'center'
        },
        card2:{
            height:'3vh',
            marginTop:'2%'
        }
    })
    const classes = useStyles();


    return (
        <div className="signup__wrapper">
            <div className="signup__card">
                <Card variant='outlined'>

                    <div className="signup__logo">
                        <img src={insta} alt="" />
                    </div>

                    <CardContent>

                        <Typography className={classes.text1} variant="subtitile1" component="div">
                            Sign up to see photos and videos from your friends
                        </Typography>

                        {true && <Alert severity="error">This is an error alert — check it out!</Alert>}

                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size='small' />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size='small' />
                        <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin='dense' size='small' />
                        <Button size="small" color='secondary' fullWidth={true} variant='outlined' margin='dense' startIcon={<CloudUploadIcon />} component='label'>
                            Upload Profile Image <input type='file' accept='image/*' hidden />
                        </Button>

                    </CardContent>

                    <CardActions>
                        <Button color='primary' fullWidth={true} variant='contained'>SIGN UP</Button>
                    </CardActions>

                    <CardContent>
                        <Typography className={classes.text1} variant="subtitile1" component="div">
                            By signing up, you agree to our Terms , Data Policy and Cookies Policy
                        </Typography>
                    </CardContent>

                </Card>
                <Card className={classes.card2}>
                    <Typography className={classes.text1} variant="subtitile1" component="div">
                        Having an account? <Link to='/login' style={{textDecoration: 'none'}}>Login</Link>
                    </Typography>
                </Card>
            </div>
        </div>

    );
}
