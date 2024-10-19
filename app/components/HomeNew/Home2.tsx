import React from 'react'

const Home2 = () => {
    return (
        <div> <div className="container-xxl bg-white p-0">
            {/* Spinner Start */}
            {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                <div className="spinner-grow text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div> */}
            {/* Spinner End */}
            {/* Navbar & Hero Start */}
            <div className="container-xxl position-relative p-0" id="home">
                <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                    <a href="https://expert8academy.info/" className="navbar-brand p-0">
                        <h1 className="m-0">Expert 8 </h1>
                        {/* <img src="img/logo.png" alt="Logo"> */}
                    </a>
                    <button className="navbar-toggler rounded-pill" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav mx-auto py-0">
                            <a href="#home" className="nav-item nav-link active">Home</a>
                            <a href="#about" className="nav-item nav-link">ระบบ Admin</a>
                            <a href="#overview" className="nav-item nav-link">ระบบหน้าบ้าน</a>
                            <a href="#features" className="nav-item nav-link">เซอร์วิส</a>
                            <a href="#pricing" className="nav-item nav-link">แพ็กเกจ</a>
                            <a href="#testimonial" className="nav-item nav-link">ลูกค้าของเรา</a>
                            <a href="#contact" className="nav-item nav-link">ติดต่อ</a>
                        </div>
                        <a href="http://m.me/experts8academy" className="btn btn-light rounded-pill py-2 px-4 ms-3 d-none d-lg-block">ติดต่อเลย</a>
                    </div>
                </nav>
                <div className="container-xxl bg-primary hero-header">
                    <div className="container">
                        <div className="row g-5 align-items-center">
                            <div className="col-lg-6 text-center text-lg-start">
                                <h1 className="text-white mb-4 animated slideInDown">บริการสร้างระบบ E-Learning เเบบครบครัน</h1>
                                <p className="text-white pb-3 animated slideInDown">พร้อมบริการงานกราฟฟิก งานตัดต่อ เเละเทคนิคยิงโฆษณาโดยมืออาชีพ</p>
                            </div>
                            <div className="col-lg-6 text-center text-lg-start">
                                <img className="img-fluid rounded animated zoomIn" src="img/hero.jpg" alt="ระบบหลังบ้านการเรียนออนไลน์" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Navbar & Hero End */}
            {/* Feature Start */}
            <div className="container-xxl py-lg-0">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="feature-item bg-light rounded text-center p-5">
                                <i className="fa fa-4x fa-edit text-primary mb-4" />
                                <h5 className="mb-3">ระบบทำด้วยการเขียนโค้ดทั้งหมด</h5>
                                <p className="m-0"> เราไม่ใช้ wordpress หรือเว็ปสำเร็จรูปในการทำ</p>
                            </div>
                        </div>
                        <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="feature-item bg-light rounded text-center p-5">
                                <i className="fa fa-4x fa-sync text-primary mb-4" />
                                <h5 className="mb-3">ระบบป้องกันที่เเน่นหนา</h5>
                                <p className="m-0">มีระบบป้องกันการดาวน์โหลด VDO เเละระบบป้องกันการเจาะระบบ</p>
                            </div>
                        </div>
                        <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="feature-item bg-light rounded text-center p-5">
                                <i className="fa fa-4x fa-draw-polygon text-primary mb-4" />
                                <h5 className="mb-3">เขียนด้วย Next-Js Framework</h5>
                                <p className="m-0">เป็นภาษาโปรเเกรมมิ่งที่ดี เเละ มีประสิทธิภาพที่สุดในโลก</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Feature End */}
            {/* About Start */}
            <div className="container-xxl py-6" id="about">
                <div className="container">
                    <div className="row g-5 flex-column-reverse flex-lg-row">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <h1 className="mb-4 text-center">ระบบหลังบ้านที่ครบครัน ใช้งานง่าย </h1>
                            <p className="mb-4">รวบรวมฟังก์ชั่นสำหรับการจัดการ website ดูยอดขาย กราฟดูภาพรวม</p>
                            <br />
                            <div className="d-flex mb-4">
                                <div className="flex-shrink-0 btn-square rounded-circle bg-primary text-white">
                                    <i className="fa fa-check" />
                                </div>
                                <br />
                                <div className="ms-4">
                                    <h5>เมนูเพิ่ม ลบ เเก้ไข คอร์ส</h5>
                                    <p className="mb-0">สามารถเพิ่ม ลบ เเก้ไข คอร์สได้ตามต้องการผ่านระบบหลังบ้านเเอดมิน
                                    </p></div>
                            </div>
                            <div className="d-flex mb-4">
                                <div className="flex-shrink-0 btn-square rounded-circle bg-primary text-white">
                                    <i className="fa fa-check" />
                                </div>
                                <div className="ms-4">
                                    <h5>ดูยอดขายเเบบ Real time</h5>
                                    <p className="mb-0">มีกราฟดูเเนวโน้มยอดขาย รายงานยอดขาย เเละจำนวนสมาชิกทั้งหมดได้</p>
                                </div>
                            </div>
                            <div className="d-flex mb-4">
                                <div className="flex-shrink-0 btn-square rounded-circle bg-primary text-white">
                                    <i className="fa fa-check" />
                                </div>
                                <div className="ms-4">
                                    <h5>ดูข้อมูลสมาชิกเเบบละเอียด รวมถึงจัดการเพิ่ม ลบ เเก้ไขเเอดมิน</h5>
                                    <p className="mb-0"> สามารถจัดการสมาชิก จัดการเเอดมิน เพิ่ม ลบ เเก้ไขสมาชิก</p>
                                </div>
                            </div>
                            <div className="d-flex mb-4">
                                <div className="flex-shrink-0 btn-square rounded-circle bg-primary text-white">
                                    <i className="fa fa-check" />
                                </div>
                                <div className="ms-4">
                                    <h5>ดูยอดขายเเละระบบเเจ้งเตือน Realtime</h5>
                                    <p className="mb-0">ดูยอดขายเเละมีเเจ้งเตือนเมื่อมีการชำระเงินเเบบ Realtime</p>
                                </div>
                            </div>
                            <a href='' className="btn btn-primary py-sm-3 px-sm-5 rounded-pill mt-3">Read More</a>
                        </div>
                        <div className="col-lg-6">
                            <img className="img-fluid rounded wow zoomIn" data-wow-delay="0.5s" src="img/about.jpg" />
                        </div>
                    </div>
                </div>
            </div>
            {/* About End */}
            {/* Overview Start */}
            <div className="container-xxl bg-light my-6 py-5" id="overview">
                <h1 className="mb-4 align-items-center text-center">ตัวอย่างระบบหน้าบ้าน</h1>
                <div className="container">
                    <div className="row g-5 py-5 align-items-center">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <img className="img-fluid rounded" src="img/nook.webp" alt="ระบบเเสดงคอร์สเรียน" />
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="d-flex align-items-center mb-4">
                                <h1 className="mb-0">01</h1>
                                <span className="bg-primary mx-2" style={{ width: 30, height: 2 }} />
                                <h5 className="mb-0">การเเสดงผลเเบบ Full Responsive</h5>
                            </div>
                            <p className="mb-4"> รองรับการเเสดงผลเเบบ Full Responsive ทุก device</p>
                            <p><i className="fa fa-check-circle text-primary me-3" />มือถือ</p>
                            <p><i className="fa fa-check-circle text-primary me-3" />Pc</p>
                            <p className="mb-0"><i className="fa fa-check-circle text-primary me-3" />Tablet</p>
                        </div>
                    </div>
                    <div className="row g-5 py-5 align-items-center flex-column-reverse flex-lg-row">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="d-flex align-items-center mb-4">
                                <h1 className="mb-0">02</h1>
                                <span className="bg-primary mx-2" style={{ width: 30, height: 2 }} />
                                <h5 className="mb-0"> User Customize</h5>
                            </div>
                            <p className="mb-4  "> นักเรียนสามารถจัดการข้อมูลบัญชีได้</p>
                            <p><i className="fa fa-check-circle text-primary me-3" />เพิ่มรูปโปรไฟล์</p>
                            <p><i className="fa fa-check-circle text-primary me-3" />ดูคอร์สเรียนที่ซื้อ</p>
                            <p className="mb-0"><i className="fa fa-check-circle text-primary me-3" />เเก้ไขเปลี่ยนชื่อได้</p>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <img className="img-fluid rounded " src="img/newpic1.webp" alt="ระบบเเก้ไขข้อมูลผู้เรียน" />
                        </div>
                    </div>
                    <div className="row g-5 py-5 align-items-center">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <img className="img-fluid rounded" src="img/nookregis.webp" alt="ระบบลงทะเบียนเรียนออนไลน์" />
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="d-flex align-items-center mb-4">
                                <h1 className="mb-0">03</h1>
                                <span className="bg-primary mx-2" style={{ width: 30, height: 2 }} />
                                <h5 className="mb-0">ระบบ Login ด้วย Google Account</h5>
                            </div>
                            <p className="mb-4"> อำนวยความสะดวกเเก่ user ด้วยการ login ระบบด้วย บัญชี Google</p>
                            <p><i className="fa fa-check-circle text-primary me-3" />สะดวก รวดเร็ว</p>
                            <p><i className="fa fa-check-circle text-primary me-3" />ไม่ต้องเสียเวลาสมัครสมาชิกใหม่</p>
                            <p className="mb-0"><i className="fa fa-check-circle text-primary me-3" />ไม่มีความผิดพลาด</p>
                        </div>
                    </div>
                    <div className="row g-5 py-5 align-items-center">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <img className="img-fluid rounded" src="img/newpic4.webp" alt="ระบบชำระเงินพร้อมเพย์ บัตรเครดิต" />
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="d-flex align-items-center mb-4">
                                <h1 className="mb-0">04</h1>
                                <span className="bg-primary mx-2" style={{ width: 30, height: 2 }} />
                                <h5 className="mb-0">รองรับการชำระเงินเเบบ Promtpay </h5>
                            </div>
                            <p className="mb-4"> ระบบชำระเงินที่สะดวกเเก่ลูกค้าของคุณ</p>
                            <p><i className="fa fa-check-circle text-primary me-3" />ชำระเงินโดยใช้บัตรเครดิต บัตรเดบิต</p>
                            <p><i className="fa fa-check-circle text-primary me-3" />ชำระเงินเเบบ Scan qr promtpay</p>
                            <p className="mb-0"><i className="fa fa-check-circle text-primary me-3" />More effective &amp; poerwfull</p>
                        </div>
                    </div>
                    <div className="row g-5 py-5 align-items-center">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <img className="img-fluid rounded" src="img/pic21.webp" alt="ระบบเข้าสู่บทเรียน" />
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="d-flex align-items-center mb-4">
                                <h1 className="mb-0">05</h1>
                                <span className="bg-primary mx-2" style={{ width: 30, height: 2 }} />
                                <h5 className="mb-0">ระบบเข้าเรียนอัตโนมัติหลังจากลูกค้าชำระเงิน </h5>
                            </div>
                            <p className="mb-4"> สร้างความสะดวก รวดเร็วให้กับลูกค้า หลังจากชำระเงิน</p>
                            <p><i className="fa fa-check-circle text-primary me-3" />ระบบจะเช็คยอดเงินเข้า</p>
                            <p><i className="fa fa-check-circle text-primary me-3" />หลังจากได้รับคอนเฟิมว่ามียอดเข้า ระบบจะให้เข้าเรียนได้ทันที</p>
                            <p><i className="fa fa-check-circle text-primary me-3" />มีระบบถาม ตอบ ให้สำหรับนักเรียน</p>
                            <p className="mb-0"><i className="fa fa-check-circle text-primary me-3" />คุณไม่ต้องคอยตรวจสอบเเละอนุมัติ</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Overview End */}
            {/* Advanced Feature Start */}
            <div className="container-xxl py-6" id="features">
                <div className="container">
                    <div className="mx-auto text-center wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
                        <h1 className="mb-3">มากกว่าเเค่ทำระบบ</h1>
                        <p className="mb-5">เรายังมีบริการให้ครบครัน ตั้งเเต่ทำระบบ งานกราฟฟิก งานตัดต่อ หรืองานด้าน marketing</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="advanced-feature-item text-center rounded py-5 px-4">
                                <i className="fa fa-edit fa-3x text-primary mb-4" />
                                <h5 className="mb-3">ตัดต่อคลิป</h5>
                                <p className="m-0">บริการสำหรับการตัดต่อคลิป</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="advanced-feature-item text-center rounded py-5 px-4">
                                <i className="fa fa-sync fa-3x text-primary mb-4" />
                                <h5 className="mb-3">ดูเเลเเละเทรนการยิงโฆษณา</h5>
                                <p className="m-0">เราจะมีผู้เชี่ยวชาญคอยดูเเลเเละเทรนการยิงโฆษณาทุกเเพลทฟอร์ม</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="advanced-feature-item text-center rounded py-5 px-4">
                                <i className="fa fa-laptop fa-3x text-primary mb-4" />
                                <h5 className="mb-3">งานกราฟฟิก</h5>
                                <p className="m-0">มีทีมงานคอยซัพพอร์ตเรื่องกราฟฟิก</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="advanced-feature-item text-center rounded py-5 px-4">
                                <i className="fa fa-draw-polygon fa-3x text-primary mb-4" />
                                <h5 className="mb-3">All in one</h5>
                                <p className="m-0">บริการครบวงจรสำหรับคุณโดยเฉพาะ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Advanced Feature End */}
            {/* Facts Start */}
            <div className="container-xxl bg-primary my-6 py-6 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-3 text-center wow fadeIn" data-wow-delay="0.1s">
                            <i className="fa fa-cogs fa-3x text-white mb-3" />
                            <h1 className="mb-2" data-toggle="counter-up">100</h1>
                            <p className="text-white mb-0">Active Install</p>
                        </div>
                        <div className="col-md-6 col-lg-3 text-center wow fadeIn" data-wow-delay="0.3s">
                            <i className="fa fa-users fa-3x text-white mb-3" />
                            <h1 className="mb-2" data-toggle="counter-up">250</h1>
                            <p className="text-white mb-0">Satisfied Clients</p>
                        </div>
                        <div className="col-md-6 col-lg-3 text-center wow fadeIn" data-wow-delay="0.7s">
                            <i className="fa fa-quote-left fa-3x text-white mb-3" />
                            <h1 className="mb-2" data-toggle="counter-up">1207</h1>
                            <p className="text-white mb-0">Clients Reviews</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Facts End */}
            {/* Process Start */}
            <div className="container-xxl py-6">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <img className="img-fluid rounded" src="img/process.jpg" alt="ระบบหลังบ้านเเอดมิน" />
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <h1 className="mb-4">รวดเร็วภายใน 3 ขั้นตอน</h1>
                            <p className="mb-4"> เราให้บริการรวดเร็ว มีประสิทธิภาพ พร้อมใช้งานได้ทันทีภายใน 5 วัน</p>
                            <ul className="process mb-0">
                                <li>
                                    <span><i className="fa fa-cog" /></span>
                                    <div>
                                        <h5>ขึ้นระบบเขียนโค้ด</h5>
                                        <p>เราจะทำระบบการเรียนออนไลน์ให้คุณภายใน 3 วัน</p>
                                    </div>
                                </li>
                                <li>
                                    <span><i className="fa fa-address-card" /></span>
                                    <div>
                                        <h5>ทำงานกราฟฟิก ตัดต่อ</h5>
                                        <p>ระหว่างทำระบบเว็ปไซต์ เราจะมีทีมงานอีกส่วนคอยทำงานกราฟฟิก ออกเเบบ ตัดต่อ</p>
                                    </div>
                                </li>
                                <li>
                                    <span><i className="fa fa-check" /></span>
                                    <div>
                                        <h5>ระบบพร้อมใช้งานเเละสำหรับการยิงโฆษณา</h5>
                                        <p>เมื่อทุกอย่างเสร็จพร้อมใช้งาน ทีมงานมืออาชีพเราจะดูเเลส่วนของการยิงโฆษณา</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* Process End */}
            {/* Pricing Start */}
            <div className="container-xxl py-6" id="pricing">
                <div className="container">
                    <div className="mx-auto text-center wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
                        <h1 className="mb-3">Pricing Plan</h1>
                        <p className="mb-5">ทุก package ชำระค่าบริการเพียงครั้งเดียว ไม่มีค่าใช้จ่ายเพิ่มเติม</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="price-item rounded overflow-hidden">
                                <div className="bg-dark p-4">
                                    <h4 className="text-white mt-2">Standard</h4>
                                    <div className="text-white">
                                        <span className="align-top fs-4 fw-bold">฿</span>
                                        <h1 className="d-inline display-6 text-primary mb-0"> 15,900.-</h1>
                                        <span className="align-baseline">/จ่ายครั้งเดียว </span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="d-flex justify-content-between mb-3"><span>ฟรีโดเมน , SSL ระบบป้องกันการเจาะเว็ปไซต์</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>ระบบการเรียนออนไลน์</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>ระบบหลังบ้าน</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>รองรับการเเสดงผลทุกอุปกรณ์</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>ทำกราฟฟิก</span><i className="fa fa-times text-danger pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>งานตัดต่อวีดีโอ</span><i className="fa fa-times text-danger pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>ดูเเลเเละเทรนการยิงโฆษณา</span><i className="fa fa-times text-danger pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>6 Months Free Support</span><i className="fa fa-times text-danger pt-1" /></div>
                                    <a href="https://www.facebook.com/experts8academy/" className="btn btn-dark rounded-pill py-2 px-4 mt-3">สนใจ</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="price-item rounded overflow-hidden">
                                <div className="bg-primary p-4">
                                    <h4 className="text-white mt-2">Pro</h4>
                                    <div className="text-white">
                                        <span className="align-top fs-4 fw-bold">฿</span>
                                        <h1 className="d-inline display-6 text-dark mb-0"> 27,900.-</h1>
                                        <span className="align-baseline">/จ่ายครั้งเดียว</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="d-flex justify-content-between mb-3"><span>ฟรีโดเมน , SSL ระบบป้องกันการเจาะเว็ปไซต์</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>ระบบการเรียนออนไลน์</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>ระบบหลังบ้าน</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>รองรับการเเสดงผลทุกอุปกรณ์</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>ทำกราฟฟิก</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>ดูเเลเเละเทรนการยิงโฆษณาทุกช่องทาง</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>ตัดต่อวีดีโอให้ 1 คอร์ส</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>3 Months Free Support</span><i className="fa fa-check text-success pt-1" /></div>
                                    <a href="https://www.facebook.com/experts8academy/" className="btn btn-primary rounded-pill py-2 px-4 mt-3">สนใจ</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="price-item rounded overflow-hidden">
                                <div className="bg-dark p-4">
                                    <h4 className="text-white mt-2">Ultimate</h4>
                                    <div className="text-white">
                                        <span className="align-top fs-4 fw-bold">฿</span>
                                        <h1 className="d-inline display-6 text-primary mb-0"> 36,900.-</h1>
                                        <span className="align-baseline">/จ่ายครั้งเดียว</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="d-flex justify-content-between mb-3"><span>ฟรีโดเมน , SSL ระบบป้องกันการเจาะเว็ปไซต์</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>ระบบการเรียนออนไลน์</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>ระบบหลังบ้าน</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>รองรับการเเสดงผลทุกอุปกรณ์</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>ทำกราฟฟิก</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>ดูเเลเเละเทรนการยิงโฆษณาทุกช่องทาง</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>ตัดต่อวีดีโอให้ 3 คอร์ส</span><i className="fa fa-check text-success pt-1" /></div>
                                    <div className="d-flex justify-content-between mb-3"><span>12 Months Free Support</span><i className="fa fa-check text-success pt-1" /></div>
                                    <a href="https://www.facebook.com/experts8academy/" className="btn btn-dark rounded-pill py-2 px-4 mt-3">สนใจ</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pricing End */}
            {/* Testimonial Start */}
            <div className="container-xxl py-6" id="testimonial">
                <div className="container">
                    <div className="mx-auto text-center wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
                        <h1 className="mb-3">ลูกค้าบางส่วนของเรา</h1>
                        <p className="mb-5">ความคิดเห็นจากครูที่จ้างเราทำระบบเเละบริการ</p>
                    </div>
                    <div className="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.1s">
                        <div className="testimonial-item bg-light rounded my-4">
                            <p className="fs-5"><i className="fa fa-quote-left fa-4x text-primary mt-n4 me-3" />ส่วนตัวไม่เก่งเรื่องระบบเลย ได้ใช้บริการเเล้วคุ้มค่ามากๆ</p>
                            <div className="d-flex align-items-center">
                                <img className="img-fluid flex-shrink-0 rounded-circle" style={{ width: 65, height: 65 }} />
                                <div className="ps-4">
                                    <h5 className="mb-1">K.Eakkasit</h5>
                                    <span>Kru'Eak</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-item bg-light rounded my-4">
                            <p className="fs-5"><i className="fa fa-quote-left fa-4x text-primary mt-n4 me-3" />ระบบดีมากๆเลยค่ะ เเนะนำเลย เราไม่ต้องคอยกังวลเรื่องอื่น เอาเวลาไปโฟกัสกับการสอน ดีมากๆ</p>
                            <div className="d-flex align-items-center">
                                <img className="img-fluid flex-shrink-0 rounded-circle" style={{ width: 65, height: 65 }} />
                                <div className="ps-4">
                                    <h5 className="mb-1">K.Siranya</h5>
                                    <span>Kru'ae</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-item bg-light rounded my-4">
                            <p className="fs-5"><i className="fa fa-quote-left fa-4x text-primary mt-n4 me-3" />ให้บริการดีมาก งานเสร็จไว เเละดี มีบริการให้ครบวงจร เราเเค่เพียงเเค่อัดคลิปสอนเท่านั้น</p>
                            <div className="d-flex align-items-center">
                                <img className="img-fluid flex-shrink-0 rounded-circle" style={{ width: 65, height: 65 }} />
                                <div className="ps-4">
                                    <h5 className="mb-1">K.Nopparat</h5>
                                    <span>Kru'nit</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Testimonial End */}
            {/* Contact Start */}
            <div className="container-xxl py-6" id="contact">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <h1 className="mb-3">Get In Touch</h1>
                            <p className="mb-4">เราเน้นให้บริการเรื่องคุณภาพ ความรวดเร็ว เเละการนำไปใช้เเล้วเกิดความคุ้มค่าเเก่ลูกค้า <a href="http://m.me/experts8academy">ติดต่อเลย</a></p>
                            <div className="d-flex mb-4">
                                <div className="flex-shrink-0 btn-square rounded-circle bg-primary text-white">
                                    <i className="fa fa-phone-alt" />
                                </div>
                                <div className="ms-3">
                                    <p className="mb-2">Call Us</p>
                                    <h5 className="mb-0">099-456-9591</h5>
                                </div>
                            </div>
                            <div className="d-flex mb-4">
                                <div className="flex-shrink-0 btn-square rounded-circle bg-primary text-white">
                                    <i className="fa fa-envelope" />
                                </div>
                                <div className="ms-3">
                                    <p className="mb-2">Mail Us</p>
                                    <h5 className="mb-0">ronnakritnook1@gmail.com</h5>
                                </div>
                            </div>
                            <div className="d-flex mb-0">
                                <div className="flex-shrink-0 btn-square rounded-circle bg-primary text-white">
                                    <i className="fa fa-map-marker-alt" />
                                </div>
                                <div className="ms-3">
                                    <p className="mb-2">Our Office</p>
                                    <h5 className="mb-0">170/51 , Nst, Thailand</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="name" placeholder="Your Name" />
                                            <label htmlFor="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" id="email" placeholder="Your Email" />
                                            <label htmlFor="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="subject" placeholder="Subject" />
                                            <label htmlFor="subject">Subject</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control" placeholder="Leave a message here" id="message" style={{ height: 150 }} defaultValue={""} />
                                            <label htmlFor="message">Message</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <a href="http://m.me/experts8academy" className="btn btn-primary rounded-pill py-2 px-4 mt-3">ส่ง</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact End */}
            {/* Footer Start */}
            <div className="container-fluid bg-dark text-body footer wow fadeIn" data-wow-delay="0.1s">
                <div className="container py-5 px-lg-5">
                    <div className="row g-5">
                        <div className="col-md-6 col-lg-3">
                            <p className="section-title text-white h5 mb-4">Address<span /></p>
                            <p><i className="fa fa-map-marker-alt me-3" /> 170/51 , Nst, Thailand</p>
                            <p><i className="fa fa-phone-alt me-3" />095-657-8395</p>
                            <p><i className="fa fa-envelope me-3" />ronnakritnook1@gmail.com</p>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter" /></a>
                                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f" /></a>
                                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-instagram" /></a>
                                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in" /></a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <p className="section-title text-white h5 mb-4">Quick Link<span /></p>
                            <a className="btn btn-link" href="">About</a>
                            <a className="btn btn-link" href="">Contact</a>
                            <a className="btn btn-link" href="">Privacy Policy</a>
                            <a className="btn btn-link" href="">Terms &amp; Conditions</a>
                            <a className="btn btn-link" href="">Support</a>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <p className="section-title text-white h5 mb-4">Community<span /></p>
                            <a className="btn btn-link" href="">Career</a>
                            <a className="btn btn-link" href="">Leadership</a>
                            <a className="btn btn-link" href="">Strategy</a>
                            <a className="btn btn-link" href="">History</a>
                            <a className="btn btn-link" href="">Components</a>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <p className="section-title text-white h5 mb-4">Newsletter<span /></p>
                            <p>Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non vulpu</p>
                            <div className="position-relative w-100 mt-3">
                                <input className="form-control border-0 rounded-pill w-100 ps-4 pe-5" type="text" placeholder="Your Email" style={{ height: 48 }} />
                                <button type="button" className="btn shadow-none position-absolute top-0 end-0 mt-1 me-2"><i className="fa fa-paper-plane text-primary fs-4" /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container px-lg-5">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                © <a className="border-bottom" href="#">Expert 8</a>, All Right Reserved.
                                {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
                                Designed By <a className="border-bottom" href="http://m.me/experts8academy">Expert 8</a>
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                <div className="footer-menu">
                                    <a href="">Home</a>
                                    <a href="">Cookies</a>
                                    <a href="">Help</a>
                                    <a href="">FQAs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer End */}
            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
        </div>
        </div>
    )
}

export default Home2