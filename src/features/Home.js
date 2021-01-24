import React, { Component } from 'react';
import { Image, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../helpers/auth';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';

const appTokenKey = "appToken";
export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allPhotos: []
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.getInitial = this.getInitial.bind(this);
    }


    componentDidMount() {
        this.getInitial();
    }


    getInitial() {
        firebase.auth().onAuthStateChanged(user => {

            if (user) {

                firebase.firestore().collection('photos').onSnapshot(snapshot => {
                    let allPhotos = [];
                    snapshot.forEach(doc => {
                        var newItem = doc.data();
                        newItem.id = doc.id;
                        allPhotos.push(newItem);
                    });

                    this.setState({ allPhotos });
                });

            }

        });

    }


    handleLogout() {
        logout()
            .then(() => {
                localStorage.removeItem(appTokenKey);
                this.props.history.push("/login");
                console.log("user signed out from firebase");
            });
    }

    async handleUploadSuccess (filename) {

        try {
            let { bucket, fullPath } = await firebase.storage().ref('images').child(filename).getMetadata();
            console.log('bucket', bucket)
            console.log('fullPath', fullPath)
            let downloadURL = await firebase.storage().ref('images').child(filename).getDownloadURL();
            console.log('downloadURL', downloadURL)

            let { uid, email, displayName } = await firebase.auth().currentUser;

            let newPhoto = {
                url: downloadURL,
                userName: displayName,
                userId: uid,
                email,
                bucket,
                fullPath
            }
            console.log('newPhoto', newPhoto);

            let photoAdded = await firebase.firestore().collection('photos').add(newPhoto);
            console.log('photoAdded', photoAdded);
        }

        catch(err) {
            console.error(err);
        }

    }



    render() {

        // our doppelganger images
        const allImages = this.state.allPhotos.map(photo => {

            return (
                <div key={photo.id}>
                    <div style={{minHeight: '215px'}}>
                        <i className="bottom-icon material-icons main-close">close</i>
                        <Image style={{ width: '100%' }} src={photo.url} responsive />
                    </div>
                </div>
            );
        })

        return (
            <div>
                <h1>My Photos Feed</h1>
                <h3>Want to know who Google thinks you look like? Upload a photo by clicking the middle button at the bottom to find out...</h3>
                {this.state.isMobile ? <h3>For selfies - rotate to landscape</h3>: ""}
                {allImages}


                    <Button variant="primary">

                            <label>
                                <i className="bottom-icon material-icons">camera_alt</i>
                                <FileUploader
                                    hidden
                                    accept="image/*"
                                    storageRef={firebase.storage().ref('images')}
                                    //onUploadStart={this.handleUploadStart}
                                    //onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    //onProgress={this.handleProgress}
                                />
                            </label>


                        </Button>
                        <Button onClick={this.handleLogout} xs={4} className="col-bottom">
                            <i className="bottom-icon material-icons">assignment_return</i>
                        </Button>



            </div>
        );
    }
}