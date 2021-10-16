from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import chromedriver_autoinstaller
from time import sleep
import base64

def getBusInfo(start, end):
	chromedriver_autoinstaller.install()
	options = webdriver.ChromeOptions()
	options.headless = True
	options.add_argument("--start-fullscreen")

	driver = webdriver.Chrome(options=options)
	url = "https://www.streetdirectory.com/travel/"
	driver.get(url)

	sleep(1)
	driver.find_element_by_class_name("btn_close").click()
	driver.find_element_by_id("transport_bus").click()

	search = driver.find_element_by_name("travel_from")
	search.clear()
	search.send_keys(start)
	sleep(1.5)
	search.send_keys(Keys.ENTER)

	search = driver.find_element_by_name("travel_to")
	search.clear()
	search.send_keys(end)
	sleep(1.5)
	search.send_keys(Keys.ENTER)
	driver.find_element_by_id("go_button").click()

	driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')
	element = driver.find_element_by_xpath('//*[@id="direction_content"]')
	element.location_once_scrolled_into_view
	binary_result = driver.find_element_by_id("direction_content").screenshot_as_png
	with open('static\\result.png', 'wb') as f:
		f.write(binary_result)

	driver.quit()