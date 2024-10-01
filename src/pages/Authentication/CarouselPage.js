import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Col } from "reactstrap";

// import images
import itsmLogo from "../../assets/images/itsm_logo_word.png";
import cictoLogo from "../../assets/images/itsm_logo.png";

const CarouselPage = (office) => {
  const officeName = "OFFICE NAME";
  return (
    <React.Fragment>
      <Col xl={9}>
        <div className="auth-full-bg pt-lg-5 p-4">
          <div className="w-100">
            <div className="bg-overlay"></div>
            <div className="d-flex h-100 flex-column">
              <div className="p-4 mt-auto">
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <div className="text-center">
                      <h4 className="mb-3">
                        {/* <img
                          src={cictoLogo}
                          alt=""
                          height="40"
                          className="auth-logo-light"
                        /> */}
                        <span className="text-primary">{officeName}</span>
                      </h4>
                      <div dir="ltr">
                        <div>
                          <div className="item">
                            <div className="py-3">
                              <p className="font-size-16 mb-4">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry&apos;s standard dummy text ever
                                since the 1500s, when an unknown printer took a
                                galley of type and scrambled it to make a type
                                specimen book. It has survived not only five
                                centuries, but also the leap into electronic
                                typesetting, remaining essentially unchanged. It
                                was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing
                                software like Aldus PageMaker including versions
                                of Lorem Ipsum.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};
export default CarouselPage;
