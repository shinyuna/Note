class CatalogItem {
  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tags = tags;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  hasTag(arg) {
    return this._tags.includes(arg);
  }
}

class Scroll  {
  constructor(catalogItem, dataLastCleaned) {
    this._catalogItem = catalogItem
    this._lastCleaned = dataLastCleaned;
  }

  needsCleaning(targetDate) {
    const threshold = this._catalogItem.hasTag('revered') ? 700 : 1500;

    return this.daysSinceLastCleaning(targetDate) > threshold;
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}

/**
 * 상속보단 필요한 정보만 위임으로 받아와서 사용할 수 있도록 한다.
 */