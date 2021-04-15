"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteerExtra = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const randomUseragent = require("random-useragent");
const logger = require("./logger");
class Proxy {
    constructor() {
        this.browser = null;
        this.page = null;
        this.pageOptions = null;
        this.waitForFunction = 'document.querySelector("body")';
        this.isLinkCrawlTest = false;
        this.responseBody = "";
    }
    initiateProfileQuery(countsLimitsData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info("initiating profile query!");
            this.pageOptions = {
                waitUntil: "networkidle2",
                timeout: countsLimitsData * 1000,
            };
            puppeteerExtra.use(pluginStealth());
            this.browser = yield puppeteerExtra.launch({
                headless: true,
                args: ["--no-sandbox"],
            });
            this.page = yield this.browser.newPage();
            yield this.page.setRequestInterception(true);
            this.page.on("request", (request) => {
                if (["image", "stylesheet", "font", "script"].indexOf(request.resourceType()) !== -1) {
                    request.abort();
                }
                else {
                    logger.info("posting data ....");
                    request.continue({
                        method: "POST",
                        postData: JSON.stringify({
                            PublicKeyBase58Check: id,
                        }),
                        headers: Object.assign(Object.assign({}, request.headers()), { "Content-Type": "application/json" }),
                    });
                }
            });
            this.page.on("requestfailed", (request) => {
                logger.info(request.url() + " " + request.failure().errorText);
            });
            this.isLinkCrawlTest = true;
        });
    }
    crawlTransactionInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info("starting crawl");
            const link = "https://api.bitclout.com/api/v1/transaction-info";
            const userAgent = randomUseragent.getRandom();
            const crawlResults = { isValidPage: true, pageSource: null };
            try {
                yield this.page.setUserAgent(userAgent);
                logger.info("going to link: ", link);
                const resp = yield this.page.goto(link, this.pageOptions);
                yield this.page.waitForFunction(this.waitForFunction);
                crawlResults.pageSource = yield this.page.content();
                this.responseBody = yield resp.text();
                return this.responseBody;
            }
            catch (error) {
                crawlResults.isValidPage = false;
                logger.error(error);
                return error;
            }
            if (this.isLinkCrawlTest) {
                this.close();
            }
        });
    }
    close() {
        if (!this.browser) {
            this.browser.close();
        }
    }
}
const proxy = new Proxy();
exports.default = proxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi91dGlscy9wcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQ2hFLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3BELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUVuQyxNQUFNLEtBQUs7SUFRVDtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsZ0NBQWdDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVLLG9CQUFvQixDQUFDLGdCQUF3QixFQUFFLEVBQVU7O1lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHO2dCQUNqQixTQUFTLEVBQUUsY0FBYztnQkFDekIsT0FBTyxFQUFFLGdCQUFnQixHQUFHLElBQUk7YUFDakMsQ0FBQztZQUNGLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDLE1BQU0sQ0FBQztnQkFDekMsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsSUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDO2FBQ3ZCLENBQUMsQ0FBQztZQUNILElBQUks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