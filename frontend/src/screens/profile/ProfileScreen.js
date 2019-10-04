import React from 'react';
import { Platform, Image, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Menu, { MenuItem, MenuDivider, Position } from 'react-native-enhanced-popup-menu';
import { LoadingScreen } from '../../commons';
import styles from './styles/ProfileScreen';
import Colors from '../../../constants/Colors';
import globals from '../../../assets/globals';
import HeaderIcon from '../../../components/HeaderIcon';
import { Controller } from './controllers/ProfileScreen';

const controller = new Controller();

export default class ImagePickerExample extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Menu',
    headerRight: (
      <TouchableOpacity onPress={navigation.getParam('showMenu')} ref={navigation.getParam('textRef')}>
        <HeaderIcon
          name={
            Platform.OS === 'ios' ? 'ios-list{focused ? \'\' : \'-outline\'}' : 'md-list'
          }
        />

      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: Colors.basicDetail,
    },
    headerTintColor: Colors.basicDetailLight,
    headerTitleStyle: {
      fontFamily: 'montserratLight',
    },
  });

  constructor(props) {
    super(props);
    this.textRef = React.createRef();
    this.menuRef = null;
    this.setMenuRef = ref => this.menuRef = ref;
    this.hideMenu = () => this.menuRef.hide();
    this.showMenu = () => this.menuRef.show(this.textRef.current, stickTo = Position.BOTTOM_CENTER);
    this.onPress = () => this.showMenu();
  }

  state = {
    id: globals.id,
    name: 'default',
    description: 'default',
    baseUrl: globals.serverAddress,
    loading: true,
    shouldBeLoaded: 1,
  };

  async componentDidMount() {
    // on reload the screen, deleting old Hangouts
    this.props.navigation.addListener('willFocus', async () => {
      await controller.deleteOldHangouts();
    });
    controller.setNameAndDescription(this);
    this.setState({ loading: false });
    this.props.navigation.setParams({
      logOut: controller.logOut.bind(this),
    });
    this.props.navigation.setParams({ showMenu: this.showMenu, textRef: this.textRef });
  }

  onChangeDescriptionInput = (newDescription) => {
    this.setState({ description: newDescription });
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }

    return (
      <View style={styles.root} >
        <TouchableOpacity onPress={async () => controller.uploadPic(this)} >

          <Image
            source={{
              uri: "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png",
              // globals.serverAddress + "photos/download/" + new Date().getMinutes()+this.state.shouldBeLoaded + "/" + globals.id + "/",
              cache: 'reload',
              method: 'post',
              headers: {
                Pragma: 'no-cache',
              },
            }}
            style={styles.image}
          />

        </TouchableOpacity>
        <Text style={styles.name}> {this.state.name} </Text>
        <TextInput
          value={this.state.description} style={styles.description}
          onChangeText={this.onChangeDescriptionInput}
          onSubmitEditing={async () => controller.onSubmitChangeDescriptionInput(this)}
        />

        <Menu
          ref={this.setMenuRef}
        >
          <MenuItem onPress={this.hideMenu}>Help</MenuItem>
          <MenuItem onPress={this.hideMenu}>About</MenuItem>
          <MenuItem onPress={this.boroNaDziesieciu}>Fiflak</MenuItem>
          <MenuDivider />
          <MenuItem onPress={async () => controller.logOut(this)}>Log out</MenuItem>
        </Menu>
      </View>
    );
  }
}
