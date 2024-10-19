"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import imageBu from './Brown_and_Gold_Floral_Appreciation_Certificate.jpg'
import { Button, Modal } from "flowbite-react";
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFViewer), { ssr: false });
Font.register({
  family: 'SukhumvitSet',
  src: '/assests/fonts/SukhumvitSet-SemiBold.ttf'
});
const styles = StyleSheet.create({
  page: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  image: {
    width: "100%",
    height: "100%"
  },
  text: {
    position: "absolute",
    left: '0px',
    right: '0px',
    top: '269px',
    marginHorizontal: 'auto',
    paddingVertical: 15,
    textAlign: "center",
    justifyContent: 'center',
    fontFamily: 'SukhumvitSet',
    fontSize: '30px',
    minHeight: '50px'
  },
  textC: {
    position: "absolute",
    left: '340px',
    right: '0px',
    top: '327px',
    marginHorizontal: 'auto',
    paddingVertical: 5,
    textAlign: "left",
    justifyContent: 'center',
    fontFamily: 'SukhumvitSet',
    fontSize: '14px',
    minHeight: '40px'
  }
  ,
  textD: {
    position: "absolute",
    left: '270px',
    right: '0px',
    top: '347px',
    marginHorizontal: 'auto',
    paddingVertical: 5,
    textAlign: "left",
    justifyContent: 'center',
    fontFamily: 'SukhumvitSet',
    fontSize: '14px',
    minHeight: '40px'
  },
  textN: {
    position: "absolute",
    left: '385px',
    right: '0px',
    top: '367px',
    marginHorizontal: 'auto',
    paddingVertical: 5,
    textAlign: "left",
    justifyContent: 'center',
    fontFamily: 'SukhumvitSet',
    fontSize: '14px',
    minHeight: '40px'
  }

});

const MyDocument = ({ openModal, onClose, data }) => {


  const date = new Date(data?.date);
  const dateN = new Date(data?.date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Bangkok',
  };

  function formatToThaiDate(date) {
    const months = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543;

    return `${day} ${month} พ.ศ. ${year}`;
  }
  return (
    <Modal show={openModal}
      size="7xl"
      className='z-[81]'
      position="center"
      onClose={onClose} popup>
      <Modal.Header>{data?.data?.course.name}</Modal.Header>
      <Modal.Body>
        <PDFViewer className='w-full min-h-screen'>
          <Document>
            <Page size="A4" style={styles.page} orientation='landscape'>
              <View style={styles.image}>
                <Image style={styles.image} src={imageBu.src} cache={false} />
              </View>
              <View style={styles.text}>
                <Text>{data?.name}</Text>
              </View>
              <View style={styles.textC}>
                <Text>{data?.data?.course.name}</Text>
              </View>
              <View style={styles.textD}>
                <Text> {formatToThaiDate(date)} </Text>
              </View>
              <View style={styles.textN}>
                <Text> {formatToThaiDate(dateN)} </Text>
              </View>

            </Page>
          </Document>
        </PDFViewer>
      </Modal.Body>
    </Modal>

  );
}

export default MyDocument