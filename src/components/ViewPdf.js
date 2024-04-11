import {View, Text, Modal, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';
import {BASE_URI} from '../services/rootService';
import BackButton from '../../assets/back.png';

const ViewPdf = ({open, pdfLink, setOpen}) => {
  console.log(BASE_URI + pdfLink);
  return (
    <Modal open={open}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 15,
          left: 10,
          zIndex: 1000,
        }}
        onPress={() => {
          setOpen(false);
        }}>
        <Image
          source={BackButton}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
      <Pdf
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        fitWidth={true}
        trustAllCerts={false}
        style={{flex: 1}}
        source={{
          uri: `${BASE_URI}/files/${pdfLink}`,
        }}
      />
    </Modal>
  );
};

export default ViewPdf;
