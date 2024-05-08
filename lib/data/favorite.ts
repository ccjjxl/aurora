import type {Podcast} from "@types";

class FavoriteStore {
  private key = "FAVORITE_PODCAST";

  private getAll(): Podcast[] {
    return JSON.parse(localStorage.getItem(this.key) || "[]");
  }

  get() {
    return this.getAll();
  }

  private persist(items: Podcast[]) {
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  saveOrUpdate(podcast: Podcast) {
    const podcasts = this.getAll();

    const find = podcasts.find((item) => item.id === podcast.id);

    if (find) {
      return false;
    } else {
      podcasts.push(podcast);
      this.persist(podcasts);
      return true;
    }
  }

  remove(podcastId: number) {
    const podcasts = this.getAll();
    const updatedPodcasts = podcasts.filter((item) => item.id !== podcastId);
    this.persist(updatedPodcasts);
  }

  isFavorite(podcastId: number) {
    const podcasts = this.getAll();
    return !!podcasts.find((item) => item.id === podcastId);
  }

  static shared = new FavoriteStore();
}

export const favoriteStore = FavoriteStore.shared;
