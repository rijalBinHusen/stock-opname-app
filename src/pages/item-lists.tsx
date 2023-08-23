import type { Component } from 'solid-js';

const ItemLists: Component = () => {
  return (
    <>
        <h1>Daftar item</h1>
        <div class="form-input">
            <input type="text" class="item-name" name="item-name" id="item-name" placeholder="Nama item baru"/>
            <button class="button">Tambah</button>
        </div>

        <div class="lists-item">
            <div class="item-card">
            <span>Item name</span>
            <button class="button secondary-color">Edit</button>
            </div>
            <div class="item-card">
            <span>Item name</span>
            <button class="button secondary-color">Edit</button>
            </div>        
            <div class="item-card">
            <span>Item name</span>
            <button class="button secondary-color">Edit</button>
            </div>        
            <div class="item-card">
            <span>Item name</span>
            <button class="button secondary-color">Edit</button>
            </div>        
            <div class="item-card">
            <span>Item name</span>
            <button class="button secondary-color">Edit</button>
            </div>        
            <div class="item-card">
            <span>Item name</span>
            <button class="button secondary-color">Edit</button>
            </div>        
            <div class="item-card">
            <span>Item name</span>
            <button class="button secondary-color">Edit</button>
            </div>        
            <div class="item-card">
            <span>Item name dddddddddddddddddd dddddddddddddd dddddddd</span>
            <button class="button secondary-color">Edit</button>
            </div>        
        </div>
    </>
  );
};

export default ItemLists;
