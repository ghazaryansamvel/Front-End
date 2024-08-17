import React, { useRef } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBTypography
} from 'mdb-react-ui-kit';
import { useOutletContext } from 'react-router-dom';
import { IContext } from '../../../helpers/types';
import { handleUpload } from '../../../helpers/api';
import { BASE, DEF } from '../../../helpers/default';
import { useVisibility } from '../../../public_private/VisibilityContext';

export function Profile() {
    const { account, setAccount } = useOutletContext<IContext>();
    const photo = useRef<HTMLInputElement>(null);
    const { isPrivate } = useVisibility();

    const choosePhoto = () => {
        const file = photo.current?.files?.[0];
        if (file) {
            const form = new FormData();
            form.append("picture", file);
            handleUpload(form)
                .then(response => {
                    setAccount({ ...account, picture: response.payload as string });
                });
        }
    }

    return (
        <div className="gradient-custom-2" style={{ backgroundColor: '#9DE2FF' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="9" xl="7">
                        <MDBCard>
                            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                    <label htmlFor="file-input" className="position-relative d-inline-block">
                                        <input
                                            id="file-input"
                                            type="file"
                                            ref={photo}
                                            onChange={choosePhoto}
                                            className="position-absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <MDBCardImage
                                            src={account.picture ? BASE + account.picture : DEF}
                                            alt="Profile"
                                            className="mt-4 mb-2 img-thumbnail"
                                            fluid
                                            style={{ width: '150px', zIndex: '1', borderRadius: '50%' }}
                                        />
                                    </label>
                                </div>
                                <div className="ms-3" style={{ marginTop: '130px' }}>
                                    <MDBTypography tag="h5">{account.name} {account.surname}</MDBTypography>
                                    <MDBCardText>New York</MDBCardText>
                                </div>
                            </div>
                            <div className="p-4 text-black" style={{ backgroundColor: '#F8F9FA' }}>
                                <div>
                                    <MDBCardText className="h4 text-muted">Account Privacy</MDBCardText>
                                    {
                                        isPrivate ?
                                            (
                                                <MDBCardImage
                                                    style={{ width: "20px", height: "20px" }}
                                                    src='https://cdn0.iconfinder.com/data/icons/market-and-economics-19/48/11-512.png'
                                                    alt="Public Account"
                                                />
                                            )
                                            :
                                            (
                                                <MDBCardImage
                                                    style={{ width: "20px", height: "20px" }}
                                                    src='https://cdn4.iconfinder.com/data/icons/credit-card-payments/48/9-512.png'
                                                    alt="Private Account"
                                                />
                                            )

                                    }
                                </div>
                                <div className="d-flex justify-content-end text-center py-1">
                                    <div>
                                        <MDBCardText className="mb-1 h5">253</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                                    </div>
                                    <div className="px-3">
                                        <MDBCardText className="mb-1 h5">1026</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                                    </div>
                                    <div>
                                        <MDBCardText className="mb-1 h5">478</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                                    </div>
                                </div>
                            </div>
                            <MDBCardBody className="text-black p-4">
                                <div className="mb-5">
                                    <p className="lead fw-normal mb-1">About</p>
                                    <div className="p-4" style={{ backgroundColor: '#F8F9FA' }}>
                                        <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                                        <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                                        <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                                    <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                                </div>
                                <MDBRow>
                                    <MDBCol className="mb-2">
                                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                            alt="image 1" className="w-100 rounded-3" />
                                    </MDBCol>
                                    <MDBCol className="mb-2">
                                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                            alt="image 1" className="w-100 rounded-3" />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="g-2">
                                    <MDBCol className="mb-2">
                                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                            alt="image 1" className="w-100 rounded-3" />
                                    </MDBCol>
                                    <MDBCol className="mb-2">
                                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                            alt="image 1" className="w-100 rounded-3" />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}