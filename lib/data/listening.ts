import {ListentingEpisodes} from "@types";

class ListeningStore {
  private key = "LISTENTING_EPISODES";

  private getAll(): ListentingEpisodes[] {
    return JSON.parse(localStorage.getItem(this.key) || "[]");
  }

  get() {
    return this.getAll();
  }

  private persist(items: ListentingEpisodes[]) {
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  getListening(epId: number) {
    return this.getAll().find((item) => item.id === epId);
  }

  saveOrUpdate(listening: ListentingEpisodes) {
    const listentingEpisodes = this.getAll();

    const find = listentingEpisodes.find((item) => item.id === listening.id);

    if (find) {
      find.process = listening.process;
      find.duration = listening.duration;
    } else {
      listentingEpisodes.push(listening);
    }

    this.persist(listentingEpisodes);
  }

  remove(epId: number) {
    const listentingEpisodes = this.getAll();
    const updatedListentingEpisodes = listentingEpisodes.filter((item) => item.id !== epId);
    this.persist(updatedListentingEpisodes);
  }

  static shared = new ListeningStore();
}

export const listeningStore = ListeningStore.shared;

export type store = ListeningStore;
