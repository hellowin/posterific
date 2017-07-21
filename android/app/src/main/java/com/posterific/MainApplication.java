package com.posterific;

import android.app.Application;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;

import com.facebook.react.ReactApplication;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackmanager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackmanager;
  }

  private final ReactNativeHost mReactNativeHost =
    new ReactNativeHost(this) {

      @Override
      public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new FBSDKPackage(mCallbackmanager),
          new RNViewShotPackage(),
          new PickerPackage()
        );
      }
    };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
  }
}
