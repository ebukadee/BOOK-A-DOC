import React from 'react'
import { Page, Document, Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    titleContainer: {
        marginTop: 24,
    },
    reportTitle: {
        color: '#3778C2',
        letterSpacing: 1,
        fontSize: 25,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    footerContainer: {
        marginTop: 12
    },
    footerTitle: {
        fontSize: 12,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
});


const PdfDocument = ({ user, info}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page} >
                <View style={styles.titleContainer}>
                    <Text style={styles.reportTitle}>BOOK-A-DOC</Text>
                </View>
                <TwoColumnLayout start="Hospital Name" end={info.hospital.name}/>
                <TwoColumnLayout start="Hospital Address" end={info.hospital.city + ", " + info.hospital.city}/>
                <TwoColumnLayout start="Appointee's Name" end={user.first_name + " " + user.last_name}/>
                <TwoColumnLayout start="Appointee's Email" end={user.email}/>
                <TwoColumnLayout start="Appointment Date" end={user.date}/>
                <TwoColumnLayout start="Appointment Time" end={user.time}/>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerTitle}>*** Thank You ***</Text>
                </View>
            </Page>
        </Document>
    );
}


const TwoColumnLayout = ({start, end}) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding:'5px 0'}} >
      <View style={{ flexDirection: 'column' }} >
        <Text>{start}</Text>
      </View>
      
      <View style={{ flexDirection: 'column' }} >
        <Text>{end}</Text>
      </View>
    </View>
  );

export default PdfDocument