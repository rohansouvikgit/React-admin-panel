import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import {
	MDBCarousel,
	MDBCarouselCaption,
	MDBCarouselInner,
	MDBCarouselItem,
	MDBView,
	MDBMask,
	MDBContainer
} from 'mdbreact'

const ProductImage = ({ show, handleClose, images }) => {
	const baseURL = 'http://localhost:8000/'
	let count = 0
	return (
		<>
			<Modal show={show} onHide={handleClose} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Product Images</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<MDBContainer>
						<MDBCarousel
							activeItem={1}
							length={images.length}
							showControls={true}
							showIndicators={true}
							className="z-depth-1"
						>
							<MDBCarouselInner>
								{images.map((index) => {
									return (
										<MDBCarouselItem itemId={++count} key={index}>
											<MDBView>
												<img className="d-block w-100" src={baseURL + index} alt="product" />
												<MDBMask overlay="black-light" />
											</MDBView>
											<MDBCarouselCaption>
												<h3 className="h3-responsive">Shadow Clone Jutsu</h3>
											</MDBCarouselCaption>
										</MDBCarouselItem>
									)
								})}
							</MDBCarouselInner>
						</MDBCarousel>
					</MDBContainer>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default ProductImage
