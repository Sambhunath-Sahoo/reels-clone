import * as React from 'react';
import {useState,useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import './Signup.css'
import insta from '../Assets/Instagram.JPG'
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Link,useHistory} from  'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { database,storage } from '../firebase';

export default function Signup() {
    // appled manual style for card
    const useStyles = makeStyles({
        text1: {
            color: "gray",
            textAlign: "center",
        },
        card2: {
            height: "3vh",
            marginTop: "2%",
        },
    });
    const classes = useStyles();

    // state required for signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const { signup } = useContext(AuthContext);


    // function for signUp and error handling
    const handleClick = async () => {

        // if user wants to signup without profile pic show this error
        if (file == null) {
            setError("Please upload profile image first");
            setTimeout(() => {
                setError('');
            }, 2000)
            return;
        }


        try {
            setError('');
            setLoading(true);
            // calling signup function to signin
            let userObj = await signup(email, password);
            // got userId from userObj.user
            let uid = userObj.user.uid;
            // uploading the user image location to storage
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            // this is required specific for file upload
            uploadTask.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} done.`)
            }
            function fn2(error) {
                // if error occurs during uploading show the errors for 2 sec and return
                setError(error);
                setTimeout(() => {
                    setError('')
                }, 2000);
                setLoading(false);
                return;
            }
            function fn3() {
                // on sucessful upload setting the URL to database
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url);
                    database.users.doc(uid).set({
                        email: email,
                        userId: uid,
                        fullname: name,
                        profileUrl: url,
                        createdAt: database.getTimeStamp()
                    })
                })
                setLoading(false);
                history.push('/')
            }
        } catch (err) {
            setError(err);
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    }

    return (
        <div className="signup__wrapper">
            <div className="signup__card">
                <Card variant="outlined">
                    <div className="signup__logo">
                        <img src={insta} alt="" />
                    </div>

                    <CardContent>
                        <Typography
                            className={classes.text1}
                            variant="subtitile1"
                            component="div"
                        >
                            Sign up to see photos and videos from your friends
                        </Typography>

                        {error != "" && <Alert severity="error">{error}</Alert>}
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            fullWidth={true}
                            margin="dense"
                            size="small"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            fullWidth={true}
                            margin="dense"
                            size="small"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Full Name"
                            variant="outlined"
                            fullWidth={true}
                            margin="dense"
                            size="small"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Button
                            color="secondary"
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            startIcon={<CloudUploadIcon />}
                            component="label"
                        >
                            Upload Profile Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </Button>
                    </CardContent>

                    <CardActions>
                        <Button color="primary" fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}>
                            Sign up
                        </Button>
                    </CardActions>

                    <CardContent>
                        <Typography
                            className={classes.text1}
                            variant="subtitile1"
                            component="div"
                        >
                            By signing up, you agree to our Terms , Data Policy and Cookies
                            Policy
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card2}>
                    <Typography
                        className={classes.text1}
                        variant="subtitile1"
                        component="div"
                    >
                        Having an account?{" "}
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            Login
                        </Link>
                    </Typography>
                </Card>
            </div>
        </div>
    );
}
