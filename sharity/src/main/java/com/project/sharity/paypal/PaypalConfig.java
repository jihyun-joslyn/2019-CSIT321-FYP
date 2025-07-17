package com.project.sharity.paypal;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.paypal.api.payments.PaymentHistory;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.OAuthTokenCredential;
import com.paypal.base.rest.PayPalRESTException;

@Configuration
public class PaypalConfig {

	private String clientId = "Ad9tUXgcPatseQwZWiKxhXJf4mX9Zf1Slvhlo5E3FzgzANOSq-6E4qYRibz3tujJ_ckwPYAf5zUfyiU1";
	private String clientSecret = "EGIm6L1fAxMjkiSzcb1K7U5Mac6wMtiHmu5511yZVcXyWXk1j2cNXCfk8NpB4p52X7wXCpHe5eKVvg3s";
	private String mode = "sandbox";

	@Bean
	public Map<String, String> paypalSdkConfig() {
		Map<String, String> configMap = new HashMap<>();
		configMap.put("mode", mode);
		return configMap;
	}

	@Bean
	public OAuthTokenCredential oAuthTokenCredential() {
		return new OAuthTokenCredential(clientId, clientSecret, paypalSdkConfig());
	}

	@Bean
	public APIContext apiContext() throws PayPalRESTException {
		APIContext context = new APIContext(oAuthTokenCredential().getAccessToken());
		context.setConfigurationMap(paypalSdkConfig());
		return context;
	}

}
