package com.aimdek;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class FJ {

	public static void main(String[] args) {

		@SuppressWarnings("resource")
		ApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml");
		Demo objA = (Demo) context.getBean("demo");

		String message = objA.sayHello();
		System.out.println(message);
 
		objA.setName("Spring");
		message = objA.sayHello();
		System.out.println(message);

	}
}
