import * as Notifications from "expo-notifications";
import NCMB, { NCMBInstallation } from "ncmb-react-native";
import * as Device from "expo-device";
import { Platform } from "react-native";

class NCMBPushNotification {
  private installation: NCMBInstallation | null = null;

  constructor(applicationKey: string, clientKey: string) {
    new NCMB(applicationKey, clientKey);
  }

  async setDeviceToken(): Promise<boolean> {
    const token = await this.getDeviceToken();
    this.installation = new NCMBInstallation();
    this.installation
      .set("deviceToken", token)
      .set("deviceType", Platform.OS === "ios" ? "ios" : "android");
    console.log(this.installation);
    await this.installation.save();
    return true;
  }

  async getDeviceToken(): Promise<string | null> {
    if (!Device.isDevice) throw new Error("This is not device");
    let { status: currentStatus } = await Notifications.getPermissionsAsync();
    if (currentStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      currentStatus = status;
    }
    if (currentStatus !== "granted") {
      return null;
    }
    return (await Notifications.getDevicePushTokenAsync()).data as string;
  }

  async getInstallation(): Promise<NCMBInstallation | null> {
    if (this.installation !== null) return this.installation;
    const token = await this.getDeviceToken();
    if (token === null) return null;
    const query = NCMBInstallation.query();
    this.installation = await query.equalTo("deviceToken", token).fetch();
    return this.installation;
  }
}

export default NCMBPushNotification;
